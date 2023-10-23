import SearchView from './SearchView'; 

describe('SearchView', () => {
  let view;

  beforeEach(() => {

    view = SearchView;
    document.body.innerHTML = '<div class="search"><input class="search__field" type="text"></div>';
  });

  it('should get the query correctly', () => {

    document.querySelector('.search__field').value = 'Sample Query';


    const query = view.getQuery();
    expect(query).toBe('Sample Query');
  });

  it('should clear the input field after getting the query', () => {

    document.querySelector('.search__field').value = 'Sample Query';


    view.getQuery();
    const inputFieldValue = document.querySelector('.search__field').value;
    expect(inputFieldValue).toBe('');
  });

  it('should add a search handler', () => {
    const handler = jest.fn();
    view.addHandlerSearch(handler);

    const form = document.querySelector('.search');
    form.dispatchEvent(new Event('submit'));

  
    expect(handler).toHaveBeenCalled();
  });



  afterEach(() => {
  
    document.body.innerHTML = '';
  });
});
