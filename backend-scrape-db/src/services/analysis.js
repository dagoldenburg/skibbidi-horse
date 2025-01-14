import { DatabaseService } from './database.js';

export class RaceAnalysisService {
    constructor() {
        this.db = new DatabaseService();
    }

    async analyzeFeatureImportance(limit = 1000, offset = 0) {
        // Query to get relevant features and race outcomes with pagination
        const query = `
            WITH RaceOutcomes AS (
                SELECT 
                    rs.race_id,
                    rs.horse_id,
                    h.age,
                    h.sex,
                    rs.distance,
                    rs.front_shoes,
                    rs.back_shoes,
                    rs.sulky_type_code,
                    h.money as career_earnings,
                    rsr.finish_position,
                    CASE WHEN rsr.finish_position = 1 THEN 1 ELSE 0 END as is_winner
                FROM race_starts rs
                JOIN horses h ON rs.horse_id = h.id
                JOIN race_start_results rsr ON rs.id = rsr.race_start_id
                WHERE rsr.finish_position IS NOT NULL
                AND rsr.disqualified = 0
                AND rsr.galloped = 0
                LIMIT ? OFFSET ?
            )
            SELECT 
                -- Categorical features
                COALESCE(sex, 'UNKNOWN') as sex,
                CASE WHEN front_shoes = 1 THEN 'With' ELSE 'Without' END as front_shoes_category,
                CASE WHEN back_shoes = 1 THEN 'With' ELSE 'Without' END as back_shoes_category,
                COALESCE(sulky_type_code, 'UNKNOWN') as sulky_type_code,
                -- Numerical features
                COALESCE(age, 0) as age,
                COALESCE(distance, 0) as distance,
                COALESCE(career_earnings, 0) as career_earnings,
                -- Target variable
                is_winner,
                -- Additional statistics
                COUNT(*) OVER (PARTITION BY sex) as races_by_sex,
                COUNT(*) OVER (PARTITION BY front_shoes) as races_by_front_shoes,
                COUNT(*) OVER (PARTITION BY back_shoes) as races_by_back_shoes,
                COUNT(*) OVER (PARTITION BY sulky_type_code) as races_by_sulky,
                CAST(SUM(is_winner) OVER (PARTITION BY sex) AS FLOAT) / 
                    NULLIF(COUNT(*) OVER (PARTITION BY sex), 0) as win_rate_by_sex,
                CAST(SUM(is_winner) OVER (PARTITION BY front_shoes) AS FLOAT) / 
                    NULLIF(COUNT(*) OVER (PARTITION BY front_shoes), 0) as win_rate_by_front_shoes,
                CAST(SUM(is_winner) OVER (PARTITION BY back_shoes) AS FLOAT) / 
                    NULLIF(COUNT(*) OVER (PARTITION BY back_shoes), 0) as win_rate_by_back_shoes,
                CAST(SUM(is_winner) OVER (PARTITION BY sulky_type_code) AS FLOAT) / 
                    NULLIF(COUNT(*) OVER (PARTITION BY sulky_type_code), 0) as win_rate_by_sulky
            FROM RaceOutcomes
            WHERE sex IS NOT NULL
            OR front_shoes IS NOT NULL
            OR back_shoes IS NOT NULL
            OR sulky_type_code IS NOT NULL
            OR age IS NOT NULL
            OR distance IS NOT NULL
            OR career_earnings IS NOT NULL
        `;

        const results = this.db.db.prepare(query).all(limit, offset);
        
        if (results.length === 0) {
            if (offset === 0) {
                throw new Error('No race data found in the database. Please ensure you have imported race data first.');
            }
            return null; // No more data to process
        }

        // Calculate feature importance based on win rates for this chunk
        const analysis = this.calculateFeatureImportance(results);
        return {
            analysis,
            hasMore: results.length === limit,
            processedRecords: results.length,
            offset: offset + results.length
        };
    }

    calculateFeatureImportance(results) {
        const features = {
            categorical: {
                sex: new Map(),
                front_shoes: new Map(),
                back_shoes: new Map(),
                sulky_type: new Map()
            },
            numerical: {
                age: {
                    correlationWithWinning: 0,
                    avgWinningAge: 0,
                    avgLosingAge: 0,
                    sampleSize: 0
                },
                distance: {
                    correlationWithWinning: 0,
                    segments: [],
                    sampleSize: 0
                },
                career_earnings: {
                    correlationWithWinning: 0,
                    avgWinningEarnings: 0,
                    avgLosingEarnings: 0,
                    sampleSize: 0
                }
            }
        };

        // Process categorical features
        results.forEach(row => {
            if (row.sex) {
                if (!features.categorical.sex.has(row.sex)) {
                    features.categorical.sex.set(row.sex, {
                        totalRaces: row.races_by_sex,
                        winRate: row.win_rate_by_sex || 0
                    });
                }
            }

            if (row.front_shoes_category) {
                if (!features.categorical.front_shoes.has(row.front_shoes_category)) {
                    features.categorical.front_shoes.set(row.front_shoes_category, {
                        totalRaces: row.races_by_front_shoes,
                        winRate: row.win_rate_by_front_shoes || 0
                    });
                }
            }

            if (row.back_shoes_category) {
                if (!features.categorical.back_shoes.has(row.back_shoes_category)) {
                    features.categorical.back_shoes.set(row.back_shoes_category, {
                        totalRaces: row.races_by_back_shoes,
                        winRate: row.win_rate_by_back_shoes || 0
                    });
                }
            }

            if (row.sulky_type_code) {
                if (!features.categorical.sulky_type.has(row.sulky_type_code)) {
                    features.categorical.sulky_type.set(row.sulky_type_code, {
                        totalRaces: row.races_by_sulky,
                        winRate: row.win_rate_by_sulky || 0
                    });
                }
            }
        });

        // Process numerical features
        const winners = results.filter(r => r.is_winner === 1);
        const losers = results.filter(r => r.is_winner === 0);

        // Age analysis
        if (results.some(r => r.age > 0)) {
            features.numerical.age.avgWinningAge = this.calculateAverage(winners.map(r => r.age));
            features.numerical.age.avgLosingAge = this.calculateAverage(losers.map(r => r.age));
            features.numerical.age.correlationWithWinning = this.calculateCorrelation(
                results.map(r => r.age),
                results.map(r => r.is_winner)
            );
            features.numerical.age.sampleSize = results.filter(r => r.age > 0).length;
        }

        // Career earnings analysis
        if (results.some(r => r.career_earnings > 0)) {
            features.numerical.career_earnings.avgWinningEarnings = this.calculateAverage(winners.map(r => r.career_earnings));
            features.numerical.career_earnings.avgLosingEarnings = this.calculateAverage(losers.map(r => r.career_earnings));
            features.numerical.career_earnings.correlationWithWinning = this.calculateCorrelation(
                results.map(r => r.career_earnings),
                results.map(r => r.is_winner)
            );
            features.numerical.career_earnings.sampleSize = results.filter(r => r.career_earnings > 0).length;
        }

        // Distance analysis
        if (results.some(r => r.distance > 0)) {
            const distanceSegments = this.createDistanceSegments(results.filter(r => r.distance > 0));
            features.numerical.distance.segments = distanceSegments;
            features.numerical.distance.correlationWithWinning = this.calculateCorrelation(
                results.map(r => r.distance),
                results.map(r => r.is_winner)
            );
            features.numerical.distance.sampleSize = results.filter(r => r.distance > 0).length;
        }

        return features;
    }

    calculateAverage(numbers) {
        if (!numbers || numbers.length === 0) return 0;
        const validNumbers = numbers.filter(n => n !== null && !isNaN(n));
        if (validNumbers.length === 0) return 0;
        return validNumbers.reduce((acc, val) => acc + val, 0) / validNumbers.length;
    }

    calculateCorrelation(xValues, yValues) {
        if (!xValues || !yValues || xValues.length === 0 || yValues.length === 0) return 0;
        if (xValues.length !== yValues.length) return 0;

        const validPairs = xValues.map((x, i) => [x, yValues[i]])
            .filter(([x, y]) => x !== null && !isNaN(x) && y !== null && !isNaN(y));

        if (validPairs.length < 2) return 0;

        const [xs, ys] = validPairs.reduce(
            ([accX, accY], [x, y]) => [[...accX, x], [...accY, y]],
            [[], []]
        );

        const n = xs.length;
        const meanX = this.calculateAverage(xs);
        const meanY = this.calculateAverage(ys);
        
        let numerator = 0;
        let denominatorX = 0;
        let denominatorY = 0;
        
        for (let i = 0; i < n; i++) {
            const xDiff = xs[i] - meanX;
            const yDiff = ys[i] - meanY;
            numerator += xDiff * yDiff;
            denominatorX += xDiff * xDiff;
            denominatorY += yDiff * yDiff;
        }
        
        const denominator = Math.sqrt(denominatorX * denominatorY);
        return denominator === 0 ? 0 : numerator / denominator;
    }

    createDistanceSegments(results) {
        if (!results || results.length === 0) return [];
        
        const segments = new Map();
        const segmentSize = 500; // 500m segments

        results.forEach(row => {
            if (row.distance > 0) {
                const segmentStart = Math.floor(row.distance / segmentSize) * segmentSize;
                const segmentKey = `${segmentStart}-${segmentStart + segmentSize}`;
                
                if (!segments.has(segmentKey)) {
                    segments.set(segmentKey, {
                        totalRaces: 0,
                        wins: 0,
                        winRate: 0
                    });
                }

                const segment = segments.get(segmentKey);
                segment.totalRaces++;
                if (row.is_winner === 1) {
                    segment.wins++;
                }
                segment.winRate = segment.wins / segment.totalRaces;
            }
        });

        return Array.from(segments.entries())
            .map(([range, stats]) => ({
                range,
                ...stats
            }))
            .sort((a, b) => parseInt(a.range) - parseInt(b.range));
    }

    async getTopPerformingFeatures(limit = null, chunkSize = 1000) {
        let offset = 0;
        let allFeatures = {
            categorical: {
                sex: new Map(),
                front_shoes: new Map(),
                back_shoes: new Map(),
                sulky_type: new Map()
            },
            numerical: {
                age: { correlationWithWinning: 0, sampleSize: 0 },
                distance: { correlationWithWinning: 0, sampleSize: 0 },
                career_earnings: { correlationWithWinning: 0, sampleSize: 0 }
            }
        };

        let totalProcessed = 0;

        try {
            while (true) {
                // If we have a limit, adjust the chunk size for the last chunk
                if (limit) {
                    const remaining = limit - totalProcessed;
                    if (remaining <= 0) break;
                    chunkSize = Math.min(chunkSize, remaining);
                }

                const result = await this.analyzeFeatureImportance(chunkSize, offset);
                
                if (!result || !result.analysis) {
                    break;
                }

                totalProcessed += result.processedRecords;

                // Merge categorical features
                Object.entries(result.analysis.categorical).forEach(([feature, valueMap]) => {
                    valueMap.forEach((value, key) => {
                        if (!allFeatures.categorical[feature].has(key)) {
                            allFeatures.categorical[feature].set(key, value);
                        }
                    });
                });

                // Merge numerical features
                Object.entries(result.analysis.numerical).forEach(([feature, stats]) => {
                    if (stats.sampleSize > 0) {
                        const currentStats = allFeatures.numerical[feature];
                        const totalSamples = currentStats.sampleSize + stats.sampleSize;
                        const weightedCorrelation = (
                            (currentStats.correlationWithWinning * currentStats.sampleSize) +
                            (stats.correlationWithWinning * stats.sampleSize)
                        ) / (totalSamples || 1);

                        allFeatures.numerical[feature] = {
                            correlationWithWinning: weightedCorrelation,
                            sampleSize: totalSamples
                        };
                    }
                });

                if (!result.hasMore || (limit && totalProcessed >= limit)) {
                    break;
                }
                offset = result.offset;
            }

            // Format results for output
            const formattedResults = {
                categorical: [],
                numerical: []
            };

            // Process categorical features
            Object.entries(allFeatures.categorical).forEach(([feature, valueMap]) => {
                if (valueMap.size > 0) {
                    const values = Array.from(valueMap.entries()).map(([value, stats]) => ({
                        value,
                        winRate: stats.winRate,
                        totalRaces: stats.totalRaces
                    }));

                    // Calculate feature impact as standard deviation of win rates
                    const winRates = values.map(v => v.winRate);
                    const impact = this.calculateStandardDeviation(winRates);

                    formattedResults.categorical.push({
                        feature,
                        impact,
                        values: values.sort((a, b) => b.winRate - a.winRate)
                    });
                }
            });

            // Process numerical features
            Object.entries(allFeatures.numerical).forEach(([feature, stats]) => {
                if (stats.sampleSize > 0) {
                    formattedResults.numerical.push({
                        feature,
                        correlation: stats.correlationWithWinning,
                        sampleSize: stats.sampleSize
                    });
                }
            });

            // Sort features by impact/correlation
            formattedResults.categorical.sort((a, b) => b.impact - a.impact);
            formattedResults.numerical.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

            return formattedResults;
        } catch (error) {
            console.error('Error in getTopPerformingFeatures:', error);
            throw new Error('Failed to analyze feature importance. Please ensure you have imported race data and the database is properly initialized.');
        }
    }

    calculateStandardDeviation(numbers) {
        if (!numbers || numbers.length === 0) return 0;
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / numbers.length;
        return Math.sqrt(variance);
    }

    async analyzeAllFeatures(chunkSize = 1000) {
        let offset = 0;
        let totalProcessed = 0;
        let aggregatedAnalysis = null;

        console.log('Starting feature analysis in chunks...');

        while (true) {
            const result = await this.analyzeFeatureImportance(chunkSize, offset);
            
            if (!result) {
                break;
            }

            console.log('Chunk result structure:', {
                recordCount: result.processedRecords,
                hasMore: result.hasMore,
                analysisKeys: Object.keys(result.analysis),
                categoricalKeys: Object.keys(result.analysis.categorical),
                numericalKeys: Object.keys(result.analysis.numerical)
            });

            if (!aggregatedAnalysis) {
                console.log('First chunk - setting initial analysis');
                aggregatedAnalysis = {
                    categorical: {
                        sex: new Map(),
                        front_shoes: new Map(),
                        back_shoes: new Map(),
                        sulky_type: new Map()
                    },
                    numerical: {
                        age: {
                            correlationWithWinning: 0,
                            avgWinningAge: 0,
                            avgLosingAge: 0,
                            sampleSize: 0
                        },
                        distance: {
                            correlationWithWinning: 0,
                            segments: [],
                            sampleSize: 0
                        },
                        career_earnings: {
                            correlationWithWinning: 0,
                            avgWinningEarnings: 0,
                            avgLosingEarnings: 0,
                            sampleSize: 0
                        }
                    }
                };

                // Copy initial values
                for (const [category, map] of Object.entries(result.analysis.categorical)) {
                    for (const [key, value] of map.entries()) {
                        aggregatedAnalysis.categorical[category].set(key, {
                            totalRaces: value.totalRaces,
                            winRate: value.winRate
                        });
                    }
                }

                // Copy numerical values
                Object.assign(aggregatedAnalysis.numerical, result.analysis.numerical);
            } else {
                // Merge numerical features
                for (const [feature, data] of Object.entries(result.analysis.numerical)) {
                    const currentTotal = aggregatedAnalysis.numerical[feature].sampleSize;
                    const newTotal = currentTotal + data.sampleSize;
                    
                    if (newTotal > 0) {
                        // Weighted average for correlation
                        aggregatedAnalysis.numerical[feature].correlationWithWinning = 
                            (aggregatedAnalysis.numerical[feature].correlationWithWinning * currentTotal + 
                             data.correlationWithWinning * data.sampleSize) / newTotal;
                        
                        // Update other metrics
                        if (feature === 'age') {
                            aggregatedAnalysis.numerical[feature].avgWinningAge = 
                                (aggregatedAnalysis.numerical[feature].avgWinningAge * currentTotal + 
                                 data.avgWinningAge * data.sampleSize) / newTotal;
                            aggregatedAnalysis.numerical[feature].avgLosingAge = 
                                (aggregatedAnalysis.numerical[feature].avgLosingAge * currentTotal + 
                                 data.avgLosingAge * data.sampleSize) / newTotal;
                        } else if (feature === 'career_earnings') {
                            aggregatedAnalysis.numerical[feature].avgWinningEarnings = 
                                (aggregatedAnalysis.numerical[feature].avgWinningEarnings * currentTotal + 
                                 data.avgWinningEarnings * data.sampleSize) / newTotal;
                            aggregatedAnalysis.numerical[feature].avgLosingEarnings = 
                                (aggregatedAnalysis.numerical[feature].avgLosingEarnings * currentTotal + 
                                 data.avgLosingEarnings * data.sampleSize) / newTotal;
                        }
                        
                        aggregatedAnalysis.numerical[feature].sampleSize = newTotal;
                    }
                }

                // Merge categorical features
                for (const [category, map] of Object.entries(result.analysis.categorical)) {
                    console.log(`Merging category ${category}:`, {
                        valueCount: map.size,
                        sampleValues: Array.from(map.entries()).slice(0, 2)
                    });
                    
                    for (const [key, value] of map.entries()) {
                        if (!aggregatedAnalysis.categorical[category].has(key)) {
                            aggregatedAnalysis.categorical[category].set(key, {
                                totalRaces: value.totalRaces,
                                winRate: value.winRate
                            });
                        } else {
                            const current = aggregatedAnalysis.categorical[category].get(key);
                            const totalRaces = current.totalRaces + value.totalRaces;
                            aggregatedAnalysis.categorical[category].set(key, {
                                totalRaces: totalRaces,
                                winRate: (current.winRate * current.totalRaces + value.winRate * value.totalRaces) / totalRaces
                            });
                        }
                    }
                }
            }

            totalProcessed += result.processedRecords;
            offset = result.offset;
            
            console.log(`Processed ${totalProcessed} records...`);
            
            if (!result.hasMore) {
                break;
            }
        }

        console.log(`Analysis complete. Total records processed: ${totalProcessed}`);
        return aggregatedAnalysis;
    }
} 