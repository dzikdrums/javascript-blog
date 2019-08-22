{
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

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
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    /* [DONE] get the article id */
    let articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */
    let articleTitle = article.querySelector(optTitleSelector).innerHTML;
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

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    let tagWrapper = article.querySelector(optArticleTagSelector);
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
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
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
  console.log(allLinks);
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
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    let authorWrapper = article.querySelector(optArticleAuthorSelector);
    let author = article.getAttribute('data-author');
    let linkHTML = '<a href="#tag-' + author + '">by ' + author + '</a>';
    authorWrapper.innerHTML = linkHTML;
  }
}

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const tagActive = document.querySelectorAll('a.active[href^="#tag-"]');
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
  const allLinks = document.querySelectorAll('a[href^="#tag-"]')
  for (let link of allLinks){
    link.addEventListener('click', authorClickHandler);
  }
}

generateAuthors();
addClickListenersToAuthors();
}
