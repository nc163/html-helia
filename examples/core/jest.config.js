
export default {
  "verbose": true,
  roots: [
    "."
  ],
  testMatch: [
    "<rootDir>/__tests__/**/?(*.)+(spec|test).+(ts|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: './tsconfig.jest.json' }]
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  modulePaths: ['<rootDir>/node_modules', '<rootDir>/../../node_modules'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    "html-ipfs/@core": "./src/$1"
  },
}