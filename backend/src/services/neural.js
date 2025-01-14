import * as tf from '@tensorflow/tfjs-node';
import path from 'path';
import fs from 'fs';

export class NeuralXOR {
    constructor() {
        this.model = null;
        this.createModel();
    }

    createModel() {
        // Create a sequential model
        this.model = tf.sequential();
        
        // Add layers
        this.model.add(tf.layers.dense({
            units: 4,
            inputShape: [3],
            activation: 'sigmoid'
        }));
        
        this.model.add(tf.layers.dense({
            units: 1,
            activation: 'sigmoid'
        }));

        // Compile the model
        this.model.compile({
            optimizer: tf.train.adam(0.1),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });
    }

    async train(epochs = 1000) {
        // XOR training data
        const xs = tf.tensor2d([
            [0, 1, 0],
            [0, 1, 1],
            [1, 1, 0],
            [1, 1, 1]
        ]);

        const ys = tf.tensor2d([
            [0],
            [1],
            [0],
            [1]
        ]);

        // Train the model
        const history = await this.model.fit(xs, ys, {
            epochs: epochs,
            verbose: 1
        });

        return history;
    }

    predict(input1, input2, input3) {
        const prediction = tf.tidy(() => {
            const inputTensor = tf.tensor2d([[input1, input2, input3]]);
            const result = this.model.predict(inputTensor);
            return result.dataSync()[0];
        });
        
        return prediction;
    }

    // Save the model
    async saveModel(modelPath) {
        // Ensure directory exists
        const dir = path.dirname(modelPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        await this.model.save(`file://${modelPath}`);
    }

    // Load a saved model
    async loadModel(modelPath) {
        this.model = await tf.loadLayersModel(`file://${modelPath}`);
        this.model.compile({
            optimizer: tf.train.adam(0.1),
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });
    }
}

// Example usage:

const xor = new NeuralXOR();
await xor.train();

console.log(xor.predict(0, 0, 1)); // Should be close to 0
console.log(xor.predict(0, 1, 0)); // Should be close to 1
console.log(xor.predict(1, 1, 0)); // Should be close to 1
console.log(xor.predict(1, 1, 1)); // Should be close to 0

