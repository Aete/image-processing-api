import fs from 'fs';
import path from 'path';

export function validateSize(num: string): boolean {
  const value: number = parseInt(num);
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    return false;
  }
  return true;
}

export function validateFilename(filename: string): boolean {
  const targetDir = `../../assets/origin`;
  const files = fs.readdirSync(path.join(__dirname, targetDir));
  const validation =
    files.find(file => file === filename) !== undefined ? true : false;

  return validation;
}
