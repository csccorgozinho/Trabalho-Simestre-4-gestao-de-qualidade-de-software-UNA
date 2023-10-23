import {
    state,
    createRecipeObject,
    loadRecipe,
    loadSearchResults,
    getSearchResultsPage,
    updateServings,
    addBookmark,
    deleteBookmark,
    uploadRecipe,
  } from './yourRecipeModule'; 
  
  describe('Recipe Module', () => {
    // Mock data for testing
    const mockData = {
      data: {
        recipe: {
          id: '123',
          title: 'Test Recipe',
          publisher: 'Test Publisher',
          source_url: 'https://example.com',
          image_url: 'https://example.com/image.jpg',
          servings: 4,
          cooking_time: 30,
          ingredients: [],
          key: 'abc123',
        },
      },
    };
  
    it('should create a recipe object', () => {
      const recipeObject = createRecipeObject(mockData);
      expect(recipeObject).toEqual({
        id: '123',
        title: 'Test Recipe',
        publisher: 'Test Publisher',
        sourceUrl: 'https://example.com',
        image: 'https://example.com/image.jpg',
        servings: 4,
        cookingTime: 30,
        ingredients: [],
        key: 'abc123',
      });
    });
  
    it('should load a recipe', async () => {
      // Mock the AJAX function
      const ajaxMock = jest.fn(() => Promise.resolve(mockData));
  
      const id = '123';
      await loadRecipe(id, ajaxMock);
      expect(state.recipe).toEqual(createRecipeObject(mockData));
    });
  
    it('should load search results', async () => {
      // Mock the AJAX function
      const ajaxMock = jest.fn(() => Promise.resolve(mockData));
  
      const query = 'Test Query';
      await loadSearchResults(query, ajaxMock);
      expect(state.search.query).toBe(query);
      expect(state.search.results).toEqual([
        {
          id: '123',
          title: 'Test Recipe',
          publisher: 'Test Publisher',
          image: 'https://example.com/image.jpg',
          key: 'abc123',
        },
      ]);
      expect(state.search.page).toBe(1);
    });
  
    it('should get search results page', () => {
      // Assuming state.search.results is an array of items
      state.search.results = [...Array(10).keys()].map((i) => ({
        id: i.toString(),
        title: `Recipe ${i}`,
        publisher: `Publisher ${i}`,
        image: `Image ${i}`,
      }));
      state.search.page = 2;
      const resultsPage = getSearchResultsPage();
      expect(resultsPage.length).toBe(5); // Assuming RES_PER_PAGE is 5
    });
  
    it('should update servings', () => {
        state.recipe = {
          servings: 4,
          ingredients: [
            { quantity: 1, unit: 'cup', description: 'Flour' },
            { quantity: 2, unit: 'tsp', description: 'Sugar' },
          ],
        };
    
        const newServings = 2;
        updateServings(newServings);
    
        expect(state.recipe.servings).toBe(newServings);
        expect(state.recipe.ingredients).toEqual([
          { quantity: 0.5, unit: 'cup', description: 'Flour' },
          { quantity: 1, unit: 'tsp', description: 'Sugar' },
        ]);
      });
    
      it('should add a bookmark', () => {
        const recipe = {
          id: '123',
          title: 'Test Recipe',
        };
        addBookmark(recipe);
    
        expect(state.bookmarks).toContainEqual(recipe);
      });
    
      it('should delete a bookmark', () => {
        state.bookmarks = [
          { id: '123', title: 'Test Recipe 1' },
          { id: '456', title: 'Test Recipe 2' },
        ];
    
        const idToDelete = '123';
        deleteBookmark(idToDelete);
    
        expect(state.bookmarks).not.toContainEqual({ id: idToDelete, title: 'Test Recipe 1' });
      });
    
      it('should upload a recipe', async () => {
        const newRecipe = {
          title: 'New Recipe',
          sourceUrl: 'https://newrecipe.com',
          image: 'https://newrecipe.com/image.jpg',
          publisher: 'New Publisher',
          cookingTime: 45,
          servings: 6,
          ingredients: [
            { quantity: 2, unit: 'cup', description: 'Sugar' },
            { quantity: 1, unit: 'tsp', description: 'Salt' },
          ],
        };
    
        // Mock the AJAX function
        const ajaxMock = jest.fn(() => Promise.resolve(mockData));
    
        await uploadRecipe(newRecipe, ajaxMock);
    
        expect(state.recipe.title).toBe('Test Recipe'); // Assuming the AJAX call returns the same recipe data
        expect(state.bookmarks.length).toBe(1);
      });
      it('should initialize bookmarks from localStorage', () => {
        // Mock localStorage.getItem
        const storage = [
          { id: '123', title: 'Bookmarked Recipe 1' },
          { id: '456', title: 'Bookmarked Recipe 2' },
        ];
        const getItemMock = jest.fn(() => JSON.stringify(storage));
        global.localStorage.getItem = getItemMock;
    
        init();
    
        expect(state.bookmarks).toEqual(storage);
      });
    
      it('should clear bookmarks in localStorage', () => {
        // Mock localStorage.clear
        const clearMock = jest.fn();
        global.localStorage.clear = clearMock;
    
        clearBookmarks();
    
        expect(clearMock).toHaveBeenCalledWith('bookmarks');
      });
    });
    
    describe('state object', () => {
      it('should have the correct initial structure', () => {
        expect(state.recipe).toEqual({});
        expect(state.search).toEqual({
          query: '',
          results: [],
          page: 1,
          resultsPerPage: RES_PER_PAGE,
        });
        expect(state.bookmarks).toEqual([]);
      });
      it('should handle errors when loading a recipe', async () => {
        // Mock an error response from AJAX
        const error = new Error('Failed to load recipe');
        const ajaxErrorMock = jest.fn(() => Promise.reject(error));
    
        try {
          await loadRecipe('123', ajaxErrorMock);
        } catch (err) {
          expect(err).toBe(error);
        }
      });
    
      it('should handle errors when loading search results', async () => {
        // Mock an error response from AJAX
        const error = new Error('Failed to load search results');
        const ajaxErrorMock = jest.fn(() => Promise.reject(error));
    
        try {
          await loadSearchResults('Test Query', ajaxErrorMock);
        } catch (err) {
          expect(err).toBe(error);
        }
      });
      describe('state object', () => {
        it('should add and delete bookmarks correctly', () => {
          // Test adding a bookmark
          const initialBookmarks = [...state.bookmarks];
          const recipeToBookmark = {
            id: '789',
            title: 'New Bookmarked Recipe',
          };
      
          addBookmark(recipeToBookmark);
      
          expect(state.bookmarks).toContainEqual(recipeToBookmark);
      
          // Test deleting a bookmark
          deleteBookmark('789');
      
          expect(state.bookmarks).toEqual(initialBookmarks);
        });
      
        it('should handle different data types for servings when updating', () => {
          state.recipe = {
            servings: 4,
            ingredients: [
              { quantity: 1, unit: 'cup', description: 'Flour' },
            ],
          };
      
          updateServings(2);
      
          expect(state.recipe.servings).toBe(2);
          
          updateServings('3'); 
      
          expect(state.recipe.servings).toBe(3);
        });
      });
    });

  

  