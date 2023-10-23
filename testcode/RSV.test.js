import ResultsView from './ResultsView'; 
import previewView from './previewView'; 

describe('ResultsView', () => {
  let view;

  beforeEach(() => {

    view = ResultsView;
  });

  it('should render results correctly', () => {

    const resultsData = [
      { id: 1, title: 'Recipe 1', image: 'recipe1.jpg' },
      { id: 2, title: 'Recipe 2', image: 'recipe2.jpg' },
      { id: 3, title: 'Recipe 3', image: 'recipe3.jpg' },
    ];

    view.render(resultsData);

    const renderedHTML = document.querySelector('.results').innerHTML;


    resultsData.forEach(result => {
      expect(renderedHTML).toContain(result.title);
      expect(renderedHTML).toContain(result.image);
    });
  });



  afterEach(() => {

    document.body.innerHTML = '';
  });
});