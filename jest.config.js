export default {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], 
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
