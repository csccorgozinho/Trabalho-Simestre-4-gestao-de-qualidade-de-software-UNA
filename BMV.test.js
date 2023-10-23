import BookmarksView from './BookmarksView'; 
import previewView from './previewView'; 

describe('BookmarksView', () => {
  let view;

  beforeEach(() => {

    view = BookmarksView;
    view.render([]); 
  });

  it('should render bookmarks correctly', () => {
    // Create sample data
    const bookmarks = [
      { id: 1, title: 'Bookmark 1' },
      { id: 2, title: 'Bookmark 2' },
      { id: 3, title: 'Bookmark 3' },
    ];


    view.render(bookmarks);


    const renderedHTML = document.querySelector('.bookmarks__list').innerHTML;
    bookmarks.forEach(bookmark => {
      expect(renderedHTML).toContain(bookmark.title);
    });
  });


  afterEach(() => {

    document.body.innerHTML = '';
  });
});