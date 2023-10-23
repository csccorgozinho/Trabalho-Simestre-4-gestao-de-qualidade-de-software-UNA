import PaginationView from './PaginationView';

describe('PaginationView', () => {
  let view;

  beforeEach(() => {

    view = PaginationView;
  });

  it('should render pagination buttons correctly for the first page', () => {
    const data = {
      page: 1,
      results: [1, 2, 3, 4, 5],
      resultsPerPage: 3,
    };

    view.render(data);

    const renderedHTML = document.querySelector('.pagination').innerHTML;

    // Expect to find the "Next" button
    expect(renderedHTML).toContain('btn--inline pagination__btn--next');

    // Expect not to find the "Previous" button
    expect(renderedHTML).not.toContain('btn--inline pagination__btn--prev');
  });

  it('should render pagination buttons correctly for the last page', () => {
    const data = {
      page: 2,
      results: [1, 2, 3, 4, 5],
      resultsPerPage: 3,
    };

    view.render(data);

    const renderedHTML = document.querySelector('.pagination').innerHTML;

    expect(renderedHTML).toContain('btn--inline pagination__btn--prev');

    expect(renderedHTML).not.toContain('btn--inline pagination__btn--next');
  });

  it('should render pagination buttons correctly for other pages', () => {
    const data = {
      page: 2,
      results: [1, 2, 3, 4, 5],
      resultsPerPage: 3,
    };

    view.render(data);

    const renderedHTML = document.querySelector('.pagination').innerHTML;


    expect(renderedHTML).toContain('btn--inline pagination__btn--prev');
    expect(renderedHTML).toContain('btn--inline pagination__btn--next');
  });



  afterEach(() => {

    document.body.innerHTML = '';
  });
});

