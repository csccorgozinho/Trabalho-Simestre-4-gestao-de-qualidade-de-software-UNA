import View from './View'; 

describe('View', () => {
  let view;

  beforeEach(() => {

    view = new View();
    document.body.innerHTML = '<div class="parent-element"></div>';
  });

  it('should render data to the DOM', () => {
    const data = { message: 'Hello, World!' };
    view.render(data);

    const renderedHTML = document.querySelector('.parent-element').innerHTML;


    expect(renderedHTML).toContain('Hello, World!');
  });

  it('should update data in the DOM', () => {
    const initialData = { message: 'Initial Message' };
    const updatedData = { message: 'Updated Message' };

    view.render(initialData);
    view.update(updatedData);

    const renderedHTML = document.querySelector('.parent-element').innerHTML;

    expect(renderedHTML).toContain('Updated Message');
  });

  it('should clear the parent element', () => {
    const data = { message: 'Hello, World!' };
    view.render(data);

    view._clear();

    const renderedHTML = document.querySelector('.parent-element').innerHTML;


    expect(renderedHTML).toBe('');
  });

  it('should render a spinner', () => {
    view.renderSpinner();

    const renderedHTML = document.querySelector('.parent-element').innerHTML;


    expect(renderedHTML).toContain('icon-loader');
  });

  it('should render an error message', () => {
    view.renderError('Error Message');

    const renderedHTML = document.querySelector('.parent-element').innerHTML;


    expect(renderedHTML).toContain('Error Message');
  });

  it('should render a success message', () => {
    view.renderMessage('Success Message');

    const renderedHTML = document.querySelector('.parent-element').innerHTML;


    expect(renderedHTML).toContain('Success Message');
  });

  // Add more test cases as needed

  afterEach(() => {

    document.body.innerHTML = '';
  });
});
