{
  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      title: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags-list',
      authors: '.authors-list',
    },
  };

// TITLE HANDLERS

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  let articleSelector = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');

};

function generateTitleLinks(customSelector = ''){
  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(select.all.articles + customSelector);
  let html = '';
  for(let article of articles){
    /* [DONE] get the article id */
    let articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    let articleTitle = article.querySelector(select.article.title).innerHTML;
    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* [DONE] insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

// TAG HANDLERS
function calculateTagsParams(tags) {
  params = {
    min: 999,
    max: 0,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max){
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.tagSizes.count -1) + 1)
  return opts.tagSizes.classPrefix +classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(select.all.articles);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    let tagWrapper = article.querySelector(select.article.tags);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    let tags = article.getAttribute('data-tags');
    /* split tags into array */
    let tagArray = tags.split(' ')
    /* START LOOP: for each tag */
    for (let tag of tagArray){
      /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      };
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(select.listOf.tags);
  const tagsParams = calculateTagsParams(allTags);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add html for allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const tagActive = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let tag of tagActive){
    /* remove class active */
    tag.classList.remove('active')
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  let properTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tag of properTags){
    /* add class active */
    tag.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const allLinks = document.querySelectorAll('a[href^="#tag-"]')
  /* START LOOP: for each link */
  for (let link of allLinks){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

generateTags();
addClickListenersToTags();

// AUTHOR HANDLERS

function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(select.all.articles);
  for (let article of articles){
    let authorWrapper = article.querySelector(select.article.author);
    let author = article.getAttribute('data-author');
    let linkHTML = '<a href="#author-' + author + '">by ' + author + '</a>';
    let linkHTMLForSidebar = '<a href="#author-' + author + '">' + author + '</a>';
    if(!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    authorWrapper.innerHTML = linkHTML;
    const tagList = document.querySelector(select.listOf.authors);
    let allAuthorsHTML = '';
    for (let author in allAuthors){
      allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '(' + allAuthors[author] + ')' + '</a></li>';
    }
    tagList.innerHTML = allAuthorsHTML;
  }
}

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#author-', '');
  const tagActive = document.querySelectorAll('a.active[href^="#author-"]');
  for (let tag of tagActive){
    tag.classList.remove('active')
  }
  let properTags = document.querySelectorAll('a[href="' + href + '"]');
  for (let tag of properTags){
    tag.classList.add('active');
  }
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors(){
  const allLinks = document.querySelectorAll('a[href^="#author-"]')
  for (let link of allLinks){
    link.addEventListener('click', authorClickHandler);
  }
}

generateAuthors();
addClickListenersToAuthors();
}
