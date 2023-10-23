import RecipeView from './RecipeView'; 

describe('RecipeView', () => {
  let view;

  beforeEach(() => {

    view = RecipeView;
  });

  it('should render the recipe correctly', () => {

    const recipeData = {
      title: 'Sample Recipe',
      image: 'sample.jpg',
      cookingTime: 30,
      servings: 4,
      ingredients: [
        { quantity: 2, unit: 'cups', description: 'Flour' },
        { quantity: 1, unit: 'tsp', description: 'Salt' },
      ],
      publisher: 'Sample Publisher',
      sourceUrl: 'https://example.com',
      bookmarked: false,
      key: null,
    };

    view.render(recipeData);

    const renderedHTML = document.querySelector('.recipe').innerHTML;


    expect(renderedHTML).toContain('Sample Recipe');
    expect(renderedHTML).toContain('sample.jpg');
    expect(renderedHTML).toContain('30');
    expect(renderedHTML).toContain('4');
    expect(renderedHTML).toContain('Flour');
    expect(renderedHTML).toContain('Salt');
    expect(renderedHTML).toContain('Sample Publisher');
    expect(renderedHTML).toContain('https://example.com');
  });

  it('should generate markup for an ingredient', () => {
    const ingredient = {
      quantity: 2,
      unit: 'cups',
      description: 'Flour',
    };

    const ingredientMarkup = view._generateMarkupIngredient(ingredient);


    expect(ingredientMarkup).toContain('2');
    expect(ingredientMarkup).toContain('cups');
    expect(ingredientMarkup).toContain('Flour');
  });



  afterEach(() => {

    document.body.innerHTML = '';
  });
});
