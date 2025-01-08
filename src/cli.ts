#!/usr/bin/env node

import { startBesu } from './startBesu';

const command = process.argv[2];

if (command === 'start') {
    startBesu();
} else {
    console.log('Invalid command');
}
