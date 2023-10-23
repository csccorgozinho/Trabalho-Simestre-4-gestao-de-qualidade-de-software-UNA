import * as model from './model';
import {
  MODAL_CLOSE_SEC,
  someTestData,
} from './config';
import {
  recipeView,
  searchView,
  resultsView,
  paginationView,
  bookmarksView,
  addRecipeView,
} from './views';

describe('Controller Functions and Event Handlers', () => {
  beforeAll(() => {

    model.state.recipes = someTestData.recipes;
  });

  it('should controlRecipes correctly', async () => {
    const mockRenderSpinner = jest.spyOn(recipeView, 'renderSpinner');
    const mockLoadRecipe = jest.spyOn(model, 'loadRecipe').mockResolvedValue(someTestData.recipe);

    await controlRecipes();

    expect(mockRenderSpinner).toHaveBeenCalled();
    expect(mockLoadRecipe).toHaveBeenCalled();

  });

  it('should controlSearchResults correctly', async () => {

    const mockRenderSpinner = jest.spyOn(resultsView, 'renderSpinner');
    const mockLoadSearchResults = jest.spyOn(model, 'loadSearchResults').mockResolvedValue(someTestData.searchResults);

    await controlSearchResults();

    expect(mockRenderSpinner).toHaveBeenCalled();
    expect(mockLoadSearchResults).toHaveBeenCalled();

  });



  it('should controlAddRecipe correctly', async () => {

    const mockRenderSpinner = jest.spyOn(addRecipeView, 'renderSpinner');
    const mockUploadRecipe = jest.spyOn(model, 'uploadRecipe').mockResolvedValue(someTestData.recipe);

    await controlAddRecipe(someTestData.newRecipe);

    expect(mockRenderSpinner).toHaveBeenCalled();
    expect(mockUploadRecipe).toHaveBeenCalledWith(someTestData.newRecipe);

  });
  it('should controlPagination correctly', () => {

    const mockRender = jest.spyOn(resultsView, 'render');

    controlPagination(2); 

    expect(mockRender).toHaveBeenCalledWith(someTestData.searchResults);

  });

  it('should controlServings correctly', () => {

    const mockUpdateServings = jest.spyOn(model, 'updateServings');

    controlServings(4); 

    expect(mockUpdateServings).toHaveBeenCalledWith(4);

  });

  it('should controlAddBookmark correctly', () => {

    const mockAddBookmark = jest.spyOn(model, 'addBookmark');
    const mockDeleteBookmark = jest.spyOn(model, 'deleteBookmark');


    controlAddBookmark();
    expect(mockAddBookmark).toHaveBeenCalledWith(someTestData.recipe);


    someTestData.recipe.bookmarked = true; 
    controlAddBookmark();
    expect(mockDeleteBookmark).toHaveBeenCalledWith(someTestData.recipe.id);


  });

  it('should controlBookmarks correctly', () => {

    const mockRender = jest.spyOn(bookmarksView, 'render');

    controlBookmarks();

    expect(mockRender).toHaveBeenCalledWith(someTestData.bookmarks);

  });
  it('should initialize the app correctly', () => {

    const mockAddHandlerRender = jest.spyOn(bookmarksView, 'addHandlerRender');
    const mockAddHandlerRenderRecipes = jest.spyOn(recipeView, 'addHandlerRender');
    const mockAddHandlerUpdateServings = jest.spyOn(recipeView, 'addHandlerUpdateServings');
    const mockAddHandlerAddBookmark = jest.spyOn(recipeView, 'addHandlerAddBookmark');
    const mockAddHandlerSearch = jest.spyOn(searchView, 'addHandlerSearch');
    const mockAddHandlerClick = jest.spyOn(paginationView, 'addHandlerClick');
    const mockAddHandlerUpload = jest.spyOn(addRecipeView, 'addHandlerUpload');

    init(); 

    expect(mockAddHandlerRender).toHaveBeenCalledWith(controlBookmarks);
    expect(mockAddHandlerRenderRecipes).toHaveBeenCalledWith(controlRecipes);
    expect(mockAddHandlerUpdateServings).toHaveBeenCalledWith(controlServings);
    expect(mockAddHandlerAddBookmark).toHaveBeenCalledWith(controlAddBookmark);
    expect(mockAddHandlerSearch).toHaveBeenCalledWith(controlSearchResults);
    expect(mockAddHandlerClick).toHaveBeenCalledWith(controlPagination);
    expect(mockAddHandlerUpload).toHaveBeenCalledWith(controlAddRecipe);

  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
});