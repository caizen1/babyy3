// Simple test script to verify the API is working
// Run this with: node test-api.js

const testApi = async () => {
  try {
    console.log('🧪 Testing Baby Recipe API...\n');
    
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check passed:', healthData);
    } else {
      console.log('❌ Health check failed:', healthResponse.status);
      return;
    }
    
    // Test 2: Recipe search
    console.log('\n2. Testing recipe search...');
    const recipeResponse = await fetch('http://localhost:3001/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ['apple', 'banana'],
        age: '6-8',
        allergens: []
      })
    });
    
    if (recipeResponse.ok) {
      const recipes = await recipeResponse.json();
      console.log('✅ Recipe search successful!');
      console.log(`📊 Found ${recipes.length} recipes`);
      if (recipes.length > 0) {
        console.log('🍎 First recipe:', recipes[0].title);
      }
    } else {
      const errorData = await recipeResponse.json();
      console.log('❌ Recipe search failed:', errorData);
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   - Node.js is installed');
    console.log('   - Server is running (npm run server)');
    console.log('   - API keys are configured in .env file');
  }
};

// Run the test
testApi(); 