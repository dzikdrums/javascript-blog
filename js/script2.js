{
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = ".tags.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

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

  const titleList = document.querySelector(optTitleListSelector + customSelector);
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

function calculateTagsParams(tags){
  let minMax = {}
  let min = 5;
  let max = 1;

  for (let tag in tags){
    if (tags[tag] < min){
      min = tags[tag];
    }
    if (tags[tag] > max){
      max = tags[tag];
    }
  }
  minMax.min = min;
  minMax.max = max;

  return minMax;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    let tagWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    let articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    let tagArray = articleTags.split(' ')

    /* START LOOP: for each tag */
    for (let tag of tagArray){

      /* generate HTML of the link */
      let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagParams = calculateTagsParams(allTags);

  // [NEW create variable for all links HTML code
  let allTagsHTML = '';

  // [NEW] START LOOP: for each tag in allTags:
  for (let tag in allTags){

    // [NEW] generate code of a link and add it to allTagsHTML
    allTagsHTML += '<li><a class="'+ calculateTagClass(allTags[tag], tagParams) + '" href="tag-' + tag + '">' + tag + '</a></li>';


  // [NEW] END LOOP: for each tag in allTags
  }

  // [NEW] add html from allTagsHTML to tagList
  tagList.innerHTML = allTagsHTML;


}


generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.innerHTML;
  tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */
  for (let tag in activeTags){

    /* remove class active */
    tag.classList.remove('active');

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
  const allLinksToTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of allLinksToTags){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
}
}

addClickListenersToTags();

// AUTHOR HANDLERS

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    let authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* get tags from data-tags attribute */
    let articleAuthor = article.getAttribute('data-author');

    let htmlLink = '<p class="post-author">by ' + articleAuthor + '</p>';

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = htmlLink;

  /* END LOOP: for every article: */
  }
}


generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('.author-name');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.active');

  /* START LOOP: for each active tag link */
  for (let tag in activeTags){

    /* remove class active */
    tag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  let properTags = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */
  for (let tag of properTags){

    /* add class active */
    tag.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[author-tags="' + tag + '"]');

}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const allLinksToAuthors = document.querySelectorAll('.authors a');

  /* START LOOP: for each link */
  for (let link of allLinksToAuthors){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
}
}

addClickListenersToAuthors();
}
