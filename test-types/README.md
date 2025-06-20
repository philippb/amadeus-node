# TypeScript Definition Tests

This directory contains comprehensive tests for the Amadeus Node SDK TypeScript definitions to ensure they accurately match the JavaScript implementation.

## Test Types

### 1. **Compilation Tests** (`basic-compilation.test.ts`)
- Verifies that type definitions compile without errors
- Tests basic instantiation and configuration
- Validates namespace structure and method signatures
- Ensures static constants are properly typed

### 2. **API Method Tests** (`api-methods.test.ts`) 
- Comprehensive testing of all API method signatures
- Validates parameter types and return types
- Tests required vs optional parameters
- Covers all 12 namespaces and 100+ methods

### 3. **Runtime Compatibility Tests** (`runtime-compatibility.test.js`)
- Jest tests that verify TypeScript definitions match actual JavaScript runtime
- Tests object structure, property existence, and method availability
- Validates dynamic resource creation (e.g., `flightOrder(id)`)
- Ensures type definitions don't drift from implementation

### 4. **DTSLint Tests** (`dtslint.test.ts`)
- Advanced type checking using TypeScript compiler API
- Tests that required parameters cause compilation errors when missing
- Validates type assignments and prevents incorrect usage
- Tests error handling and Promise return types

## Running Tests

### Prerequisites
```bash
cd test-types
npm install
```

### Individual Test Commands
```bash
# Type compilation check
npm run test:compilation

# Runtime compatibility tests  
npm run test:runtime

# Advanced type checking
npm run test:dtslint

# All tests
npm run test:all
```

### Integration with Main Project

Add these scripts to the main `package.json`:

```json
{
  "scripts": {
    "test:types": "cd test-types && npm run test:all",
    "test": "jest spec --coverage && npm run test:types",
    "build": "babel -d lib src/ -s inline && cp test-types/../lib/amadeus.d.ts lib/"
  }
}
```

## What These Tests Verify

### ✅ **Type Accuracy**
- All method signatures match JavaScript implementation
- Parameter types are correct (required vs optional)
- Return types are properly defined as `Promise<Response>`
- Error types match the actual error classes

### ✅ **API Coverage**
- All 12 namespaces are properly typed
- All 100+ API methods have correct signatures
- Dynamic resource methods work correctly
- Static constants have proper literal types

### ✅ **Runtime Compatibility**
- TypeScript definitions match actual JavaScript structure
- Object properties exist at runtime
- Methods are callable and return expected types
- No drift between definitions and implementation

### ✅ **Developer Experience**
- Required parameters cause compilation errors when missing
- Optional parameters work correctly
- IntelliSense provides accurate suggestions
- Type checking prevents common mistakes

## Continuous Integration

These tests should be run in CI/CD to catch regressions:

```yaml
# .github/workflows/test.yml
- name: Test TypeScript definitions
  run: |
    cd test-types
    npm install
    npm run test:all
```

## Benefits

1. **Prevents Type Drift**: Ensures definitions stay in sync with JavaScript code
2. **Catches Breaking Changes**: Identifies API changes that break TypeScript users
3. **Validates Accuracy**: Confirms all methods and properties are correctly typed
4. **Improves Reliability**: Reduces bugs in TypeScript projects using the SDK
5. **Better Documentation**: Tests serve as living examples of correct usage

These tests provide comprehensive coverage and give confidence that the TypeScript definitions accurately represent the Amadeus Node SDK API surface.