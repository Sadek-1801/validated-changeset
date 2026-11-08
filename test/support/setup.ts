import structuredClone from '@ungap/structured-clone';

// Jest 24 runs tests in a sandbox without Node's `structuredClone`, and
// WarpDrive calls it as soon as it loads.
Object.assign(globalThis, { structuredClone });
