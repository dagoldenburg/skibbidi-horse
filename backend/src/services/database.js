import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import Database from 'better-sqlite3';
import crypto from 'crypto';

export class DatabaseService {
    constructor() {
        const dbPath = join(process.cwd(), 'data', 'sql', 'horse.db');
        this.db = new Database(dbPath);
    }

    // Create tables without foreign keys
    createTables() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS processed_files (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL UNIQUE,
                processed_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS tracks (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                country_code TEXT,
                condition_status TEXT,
                UNIQUE(name, country_code)
            );

            CREATE TABLE IF NOT EXISTS drivers (
                id INTEGER PRIMARY KEY,
                first_name TEXT,
                last_name TEXT,
                short_name TEXT,
                location TEXT,
                birth_year INTEGER,
                home_track_id INTEGER,
                license TEXT,
                silks TEXT
            );

            CREATE TABLE IF NOT EXISTS trainers (
                id INTEGER PRIMARY KEY,
                first_name TEXT,
                last_name TEXT,
                short_name TEXT,
                location TEXT,
                birth_year INTEGER,
                home_track_id INTEGER,
                license TEXT
            );

            CREATE TABLE IF NOT EXISTS horses (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                nationality TEXT,
                age INTEGER,
                sex TEXT,
                color TEXT,
                trainer_id INTEGER,
                home_track_id INTEGER,
                owner_name TEXT,
                owner_location TEXT,
                breeder_name TEXT,
                breeder_location TEXT,
                money INTEGER,
                father_id INTEGER,
                father_name TEXT,
                father_nationality TEXT,
                mother_id INTEGER,
                mother_name TEXT,
                mother_nationality TEXT,
                grandfather_id INTEGER,
                grandfather_name TEXT,
                grandfather_nationality TEXT
            );

            CREATE TABLE IF NOT EXISTS horse_records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                horse_id INTEGER,
                driver_id INTEGER,
                code TEXT,
                start_method TEXT,
                distance TEXT,
                minutes INTEGER,
                seconds INTEGER,
                tenths INTEGER,
                year TEXT,
                place INTEGER
            );

            CREATE TABLE IF NOT EXISTS races (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                date DATE NOT NULL,
                number INTEGER,
                distance INTEGER,
                start_method TEXT,
                start_time DATETIME,
                scheduled_start_time DATETIME,
                prize_info TEXT,
                sport TEXT,
                track_id INTEGER,
                track_condition TEXT,
                track_country_code TEXT,
                victory_margin TEXT,
                status TEXT
            );

            CREATE TABLE IF NOT EXISTS race_starts (
                id TEXT PRIMARY KEY,
                race_id TEXT,
                horse_id INTEGER,
                driver_id INTEGER,
                trainer_id INTEGER,
                number INTEGER,
                post_position INTEGER,
                distance INTEGER,
                shoes_reported INTEGER,
                front_shoes INTEGER,
                front_shoes_changed INTEGER,
                back_shoes INTEGER,
                back_shoes_changed INTEGER,
                sulky_reported INTEGER,
                sulky_type_code TEXT,
                sulky_type_text TEXT,
                sulky_type_eng_text TEXT,
                sulky_color_code TEXT,
                sulky_color_text TEXT,
                sulky_color_eng_text TEXT,
                sulky_changed BOOLEAN,
                final_odds DECIMAL(10,2)
            );

            CREATE TABLE IF NOT EXISTS race_pools (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                race_id TEXT,
                pool_type TEXT,
                status TEXT,
                timestamp DATETIME,
                turnover INTEGER,
                bet_type TEXT
            );

            CREATE TABLE IF NOT EXISTS pool_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                race_pool_id INTEGER,
                combination TEXT,
                odds INTEGER,
                position INTEGER
            );

            CREATE TABLE IF NOT EXISTS race_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                race_id TEXT NOT NULL,
                victory_margin TEXT,
                winning_time TEXT,
                winner_horse_id INTEGER,
                winner_driver_id INTEGER,
                winner_finish_time TEXT,
                winner_km_time TEXT,
                scratchings TEXT
            );

            CREATE TABLE IF NOT EXISTS race_start_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                race_start_id TEXT NOT NULL,
                finish_position INTEGER,
                finish_order INTEGER,
                finish_time TEXT,
                km_time TEXT,
                prize_money INTEGER,
                galloped BOOLEAN,
                disqualified BOOLEAN,
                final_odds DECIMAL(10,2)
            );

            CREATE TABLE IF NOT EXISTS betting_pools (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                race_id TEXT NOT NULL,
                pool_type TEXT NOT NULL,
                turnover INTEGER,
                status TEXT,
                timestamp DATETIME
            );

            CREATE TABLE IF NOT EXISTS pool_winners (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                betting_pool_id INTEGER NOT NULL,
                combination TEXT NOT NULL,
                odds INTEGER,
                payout INTEGER
            );
        `);
    }

    // Add foreign key constraints after data is loaded
    /*addForeignKeys() {
        this.db.exec(`
            ALTER TABLE drivers ADD CONSTRAINT fk_driver_track 
            FOREIGN KEY (home_track_id) REFERENCES tracks(id);

            ALTER TABLE trainers ADD CONSTRAINT fk_trainer_track 
            FOREIGN KEY (home_track_id) REFERENCES tracks(id);

            ALTER TABLE horses ADD CONSTRAINT fk_horse_track 
            FOREIGN KEY (home_track_id) REFERENCES tracks(id);

            ALTER TABLE horse_records ADD CONSTRAINT fk_horse_records_horse 
            FOREIGN KEY (horse_id) REFERENCES horses(id);

            ALTER TABLE horse_records ADD CONSTRAINT fk_horse_records_driver 
            FOREIGN KEY (driver_id) REFERENCES drivers(id);

            ALTER TABLE races ADD CONSTRAINT fk_race_track 
            FOREIGN KEY (track_id) REFERENCES tracks(id);

            ALTER TABLE race_starts ADD CONSTRAINT fk_race_starts_race 
            FOREIGN KEY (race_id) REFERENCES races(id);

            ALTER TABLE race_starts ADD CONSTRAINT fk_race_starts_horse 
            FOREIGN KEY (horse_id) REFERENCES horses(id);

            ALTER TABLE race_starts ADD CONSTRAINT fk_race_starts_driver 
            FOREIGN KEY (driver_id) REFERENCES drivers(id);

            ALTER TABLE race_starts ADD CONSTRAINT fk_race_starts_trainer 
            FOREIGN KEY (trainer_id) REFERENCES trainers(id);

            ALTER TABLE race_pools ADD CONSTRAINT fk_race_pools_race 
            FOREIGN KEY (race_id) REFERENCES races(id);

            ALTER TABLE pool_results ADD CONSTRAINT fk_pool_results_race_pool 
            FOREIGN KEY (race_pool_id) REFERENCES race_pools(id);

            -- Add indexes for better query performance
            CREATE INDEX IF NOT EXISTS idx_race_starts_race_id ON race_starts(race_id);
            CREATE INDEX IF NOT EXISTS idx_race_starts_horse_id ON race_starts(horse_id);
            CREATE INDEX IF NOT EXISTS idx_race_starts_driver_id ON race_starts(driver_id);
            CREATE INDEX IF NOT EXISTS idx_race_starts_trainer_id ON race_starts(trainer_id);
            CREATE INDEX IF NOT EXISTS idx_races_date ON races(date);
            CREATE INDEX IF NOT EXISTS idx_tracks_name ON tracks(name);
            CREATE INDEX IF NOT EXISTS idx_tracks_country ON tracks(country_code);
        `);
    }*/

    async parseAndInsertData() {
        try {
            // Read all JSON files from the raw data directory
            const rawDataPath = join(process.cwd(), 'data', 'raw');
            const files = await readdir(rawDataPath);
            const jsonFiles = files.filter(file => file.endsWith('.json'));

            this.createTables();

            // Prepare statements for checking and tracking processed files
            const checkProcessedFile = this.db.prepare('SELECT 1 FROM processed_files WHERE filename = ?');
            const insertProcessedFile = this.db.prepare('INSERT INTO processed_files (filename) VALUES (?)');

            console.log(`Found ${jsonFiles.length} JSON files to process`);
            let processedFiles = 0;
            let skippedFiles = 0;
            let totalSteps = 0;

            for (const file of jsonFiles) {
                // Check if file has already been processed
                const isProcessed = checkProcessedFile.get(file);
                if (isProcessed) {
                    skippedFiles++;
                    continue;
                }

                try {
                    const filePath = join(rawDataPath, file);
                    const jsonContent = await readFile(filePath, 'utf-8');
                    const jsonData = JSON.parse(jsonContent);

                    // Start transaction for each file
                    this.db.prepare('BEGIN TRANSACTION').run();

                    // Insert track data first
                    const insertTrack = this.db.prepare(`
                        INSERT OR IGNORE INTO tracks (id, name, country_code, condition_status)
                        VALUES (@id, @name, @countryCode, @condition)
                    `);

                    const track = jsonData.races[0].track;
                    insertTrack.run({
                        id: track.id,
                        name: track.name,
                        countryCode: track.countryCode,
                        condition: track.condition
                    });

                    // Process each race
                    const insertRace = this.db.prepare(`
                        INSERT OR IGNORE INTO races (
                            id, name, date, number, distance, start_method,
                            start_time, scheduled_start_time, prize_info,
                            sport, track_id, status
                        ) VALUES (
                            @id, @name, @date, @number, @distance, @startMethod,
                            @startTime, @scheduledStartTime, @prize,
                            @sport, @trackId, @status
                        )
                    `);

                    // Prepare statements for participants
                    const insertDriver = this.db.prepare(`
                        INSERT OR IGNORE INTO drivers (
                            id, first_name, last_name, short_name,
                            location, birth_year, home_track_id, license, silks
                        ) VALUES (
                            @id, @firstName, @lastName, @shortName,
                            @location, @birth, 
                            (SELECT id FROM tracks WHERE id = @homeTrackId),
                            @license, @silks
                        )
                    `);

                    const insertTrainer = this.db.prepare(`
                        INSERT OR IGNORE INTO trainers (
                            id, first_name, last_name, short_name,
                            location, birth_year, home_track_id, license
                        ) VALUES (
                            @id, @firstName, @lastName, @shortName,
                            @location, @birth, @homeTrackId, @license
                        )
                    `);

                    const insertHorse = this.db.prepare(`
                        INSERT OR IGNORE INTO horses (
                            id, name, nationality, age, sex, color,
                            trainer_id, home_track_id, money,
                            owner_name, owner_location,
                            breeder_name, breeder_location,
                            father_id, father_name, father_nationality,
                            mother_id, mother_name, mother_nationality,
                            grandfather_id, grandfather_name, grandfather_nationality
                        ) VALUES (
                            @id, @name, @nationality, @age, @sex, @color,
                            @trainerId, @homeTrackId, @money,
                            @ownerName, @ownerLocation,
                            @breederName, @breederLocation,
                            @fatherId, @fatherName, @fatherNationality,
                            @motherId, @motherName, @motherNationality,
                            @grandfatherId, @grandfatherName, @grandfatherNationality
                        )
                    `);

                    const insertRaceStart = this.db.prepare(`
                        INSERT OR IGNORE INTO race_starts (
                            id, race_id, horse_id, driver_id, trainer_id,
                            number, post_position, distance,
                            shoes_reported, front_shoes, front_shoes_changed,
                            back_shoes, back_shoes_changed,
                            sulky_reported, sulky_type_code, sulky_type_text,
                            sulky_color_code, sulky_color_text
                        ) VALUES (
                            @id, @raceId, @horseId, @driverId, @trainerId,
                            @number, @postPosition, @distance,
                            @shoesReported, @frontShoes, @frontShoesChanged,
                            @backShoes, @backShoesChanged,
                            @sulkyReported, @sulkyTypeCode, @sulkyTypeText,
                            @sulkyColorCode, @sulkyColorText
                        )
                    `);

                    // Process each race
                    for (const race of jsonData.races) {

                        if (race.track.id) {
                            const trackExists = this.db.prepare('SELECT 1 FROM tracks WHERE id = ?').get(race.track.id);
                            if (!trackExists) {
                                race.track.id = null;
                            }
                        }

                        // Insert race data
                        insertRace.run({
                            id: race.id,
                            name: race.name,
                            date: race.date,
                            number: race.number,
                            distance: race.distance,
                            startMethod: race.startMethod,
                            startTime: race.startTime,
                            scheduledStartTime: race.scheduledStartTime,
                            prize: race.prize,
                            sport: race.sport,
                            trackId: race.track.id,
                            status: race.status,
                        });

                        // Process each start in the race
                        for (const start of race.starts) {
                            const horse = start.horse;
                            const driver = start.driver;
                            const trainer = horse.trainer;

                            // Insert driver
                            if (driver) {
                                try {
                                    // First ensure the home track exists if provided

                                    insertDriver.run({
                                        id: driver.id,
                                        firstName: driver.firstName,
                                        lastName: driver.lastName,
                                        shortName: driver.shortName,
                                        location: driver.location,
                                        birth: driver.birth,
                                        homeTrackId: driver.homeTrack?.id || null,
                                        license: driver.license,
                                        silks: driver.silks
                                    });
                                } catch (error) {
                                    console.warn(`Warning: Failed to insert driver ${driver.id}:`, error.message);
                                }
                            }

                            // Insert trainer
                            if (trainer) {
                                insertTrainer.run({
                                    id: trainer.id,
                                    firstName: trainer.firstName,
                                    lastName: trainer.lastName,
                                    shortName: trainer.shortName,
                                    location: trainer.location,
                                    birth: trainer.birth,
                                    homeTrackId: trainer.homeTrack?.id,
                                    license: trainer.license
                                });
                            }

                            // Insert horse
                            insertHorse.run({
                                id: horse.id,
                                name: horse.name,
                                nationality: horse.nationality || 'SE',
                                age: horse.age,
                                sex: horse.sex,
                                color: horse.color,
                                trainerId: trainer?.id,
                                homeTrackId: horse.homeTrack?.id,
                                money: horse.money,
                                ownerName: horse.owner?.name,
                                ownerLocation: horse.owner?.location,
                                breederName: horse.breeder?.name,
                                breederLocation: horse.breeder?.location,
                                fatherId: horse.pedigree?.father?.id,
                                fatherName: horse.pedigree?.father?.name,
                                fatherNationality: horse.pedigree?.father?.nationality || 'SE',
                                motherId: horse.pedigree?.mother?.id,
                                motherName: horse.pedigree?.mother?.name,
                                motherNationality: horse.pedigree?.mother?.nationality || 'SE',
                                grandfatherId: horse.pedigree?.grandfather?.id,
                                grandfatherName: horse.pedigree?.grandfather?.name,
                                grandfatherNationality: horse.pedigree?.grandfather?.nationality || 'SE'
                            });

                            // Create a unique hash for the race start
                            const hashInput = `${race.id}-${start.number}-${start.horse.id}-${race.date}-${race.distance}`;
                            const uniqueId = crypto
                                .createHash('md5')
                                .update(hashInput)
                                .digest('hex');

                            insertRaceStart.run({
                                id: uniqueId,
                                raceId: race.id,
                                horseId: horse.id,
                                driverId: driver?.id || null,
                                trainerId: trainer?.id || null,
                                number: start.number || null,
                                postPosition: start.postPosition || null,
                                distance: start.distance || null,
                                shoesReported: horse.shoes?.reported ? 1 : 0,
                                frontShoes: horse.shoes?.front?.hasShoe ? 1 : 0,
                                frontShoesChanged: horse.shoes?.front?.changed ? 1 : 0,
                                backShoes: horse.shoes?.back?.hasShoe ? 1 : 0,
                                backShoesChanged: horse.shoes?.back?.changed ? 1 : 0,
                                sulkyReported: horse.sulky?.reported ? 1 : 0,
                                sulkyTypeCode: horse.sulky?.type?.code || null,
                                sulkyTypeText: horse.sulky?.type?.text || null,
                                sulkyTypeEngText: horse.sulky?.type?.engText || null,
                                sulkyColorCode: horse.sulky?.colour?.code || null,
                                sulkyColorText: horse.sulky?.colour?.text || null,
                                sulkyColorEngText: horse.sulky?.colour?.engText || null,
                                sulkyChanged: horse.sulky?.changed ? 1 : 0,
                                finalOdds: start.result?.finalOdds || null
                            });
                            totalSteps++;
                            
                            if (totalSteps % 5000 === 0) {
                                console.log(`Processed ${totalSteps} steps (${processedFiles}/${jsonFiles.length} files)`);
                            }

                            // Insert race results
                            if (race.result) {
                                const insertRaceResult = this.db.prepare(`
                                    INSERT OR IGNORE INTO race_results 
                                    (race_id, victory_margin, winner_horse_id, winner_driver_id, 
                                    winner_finish_time, winner_km_time, scratchings)
                                    VALUES (@raceId, @victoryMargin, @winnerHorseId, @winnerDriverId,
                                    @winnerFinishTime, @winnerKmTime, @scratchings)
                                `);

                                // Find the winning start (position 1)
                                const winningStart = race.starts.find(s => s.result && s.result.place === 1);
                                
                                let winnerKmTimeStr = null;
                                if (winningStart?.result?.kmTime && typeof winningStart.result.kmTime === 'object') {
                                    const minutes = winningStart.result.kmTime.minutes || 0;
                                    const seconds = winningStart.result.kmTime.seconds || 0;
                                    const tenths = winningStart.result.kmTime.tenths || 0;
                                    winnerKmTimeStr = `${minutes}:${String(seconds).padStart(2, '0')}.${tenths}`;
                                }

                                insertRaceResult.run({
                                    raceId: race.id,
                                    victoryMargin: race.result.victoryMargin || null,
                                    winnerHorseId: winningStart ? winningStart.horse.id : null,
                                    winnerDriverId: winningStart?.driver?.id || null,
                                    winnerFinishTime: winningStart?.result?.finishTime || null,
                                    winnerKmTime: winnerKmTimeStr,
                                    scratchings: JSON.stringify(race.result.scratchings || [])
                                });
                            }

                            // Insert betting pools and results
                            if (race.pools) {
                                const insertBettingPool = this.db.prepare(`
                                    INSERT OR IGNORE INTO betting_pools 
                                    (race_id, pool_type, turnover, status, timestamp)
                                    VALUES (@raceId, @poolType, @turnover, @status, @timestamp)
                                `);

                                const insertPoolWinner = this.db.prepare(`
                                    INSERT OR IGNORE INTO pool_winners 
                                    (betting_pool_id, combination, odds, payout)
                                    VALUES (@poolId, @combination, @odds, @payout)
                                `);

                                for (const [poolType, poolData] of Object.entries(race.pools)) {
                                    if (poolData.status === 'results') {
                                        const poolResult = insertBettingPool.run({
                                            raceId: race.id,
                                            poolType: poolType,
                                            turnover: typeof poolData.turnover === 'number' ? poolData.turnover : null,
                                            status: typeof poolData.status === 'string' ? poolData.status : null,
                                            timestamp: typeof poolData.timestamp === 'string' ? poolData.timestamp : null
                                        });

                                        // Handle different pool result types
                                        if (poolData.result) {
                                            if (poolData.result.winners) {
                                                // Handle single winner format
                                                if (Array.isArray(poolData.result.winners)) {
                                                    poolData.result.winners.forEach(winner => {
                                                        const combination = winner.number || winner.combination;
                                                        insertPoolWinner.run({
                                                            poolId: poolResult.lastInsertRowid,
                                                            combination: typeof combination === 'object' ? JSON.stringify(combination) : String(combination),
                                                            odds: typeof winner.odds === 'number' ? winner.odds : null,
                                                            payout: typeof winner.payout === 'number' ? winner.payout : null
                                                        });
                                                    });
                                                } else if (typeof poolData.result.winners === 'object') {
                                                    // Handle multi-position format (e.g., plats pool)
                                                    for (const [position, winners] of Object.entries(poolData.result.winners)) {
                                                        winners.forEach(winner => {
                                                            const combinationObj = {
                                                                position: position,
                                                                number: winner.number
                                                            };
                                                            insertPoolWinner.run({
                                                                poolId: poolResult.lastInsertRowid,
                                                                combination: JSON.stringify(combinationObj),
                                                                odds: typeof winner.odds === 'number' ? winner.odds : null,
                                                                payout: typeof winner.payout === 'number' ? winner.payout : null
                                                            });
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            // Insert race start results if available
                            if (start.result) {
                                const insertRaceStartResult = this.db.prepare(`
                                    INSERT OR IGNORE INTO race_start_results 
                                    (race_start_id, finish_position, finish_order, finish_time, km_time, 
                                    prize_money, galloped, disqualified, final_odds)
                                    VALUES (@raceStartId, @position, @finishOrder, @finishTime, @kmTime, 
                                    @prizeMoney, @galloped, @disqualified, @finalOdds)
                                `);

                                let kmTimeStr = null;
                                if (start.result.kmTime && typeof start.result.kmTime === 'object') {
                                    const minutes = start.result.kmTime.minutes || 0;
                                    const seconds = start.result.kmTime.seconds || 0;
                                    const tenths = start.result.kmTime.tenths || 0;
                                    kmTimeStr = `${minutes}:${String(seconds).padStart(2, '0')}.${tenths}`;
                                }

                                insertRaceStartResult.run({
                                    raceStartId: uniqueId,
                                    position: start.result.place || null,
                                    finishOrder: start.result.finishOrder || null,
                                    finishTime: start.result.finishTime || null,
                                    kmTime: kmTimeStr,
                                    prizeMoney: typeof start.result.prizeMoney === 'number' ? start.result.prizeMoney : null,
                                    galloped: start.result.galloped ? 1 : 0,
                                    disqualified: start.result.disqualified ? 1 : 0,
                                    finalOdds: typeof start.result.finalOdds === 'number' ? start.result.finalOdds : null
                                });
                            }
                        }
                    }

                    this.db.prepare('COMMIT').run();
                    // Mark file as processed after successful commit
                    insertProcessedFile.run(file);
                    processedFiles++;
                    
                    // Remove or comment out the existing per-file log
                    // console.log(`Processed ${file} (${processedFiles}/${jsonFiles.length})`);

                } catch (error) {
                    this.db.prepare('ROLLBACK').run();
                    console.error(`Error processing file ${file}:`, error);
                }
            }

            console.log(`Successfully processed ${processedFiles} new files, skipped ${skippedFiles} already processed files (${totalSteps} total steps)`);
            //TODO: WHen postgres, uncomment
            //this.addForeignKeys();
            return processedFiles;

        } catch (error) {
            console.error('Error reading data directory:', error);
            throw error;
        }
    }

    close() {
        this.db.close();
    }
}