# utkarsh06542.github.io

Purpose of this webpage is to display contents of article (through retriving data from wikipedia.org) in ten different laguages.

The complete webpage is under "main-body" section. (It can be seen in index.html)

The view of the webpage(main-body section) is divided into 3 main parts.
1.Left Sidebar  2.Article Title bar   3.Article content section

In order to change contents of left sidebar, make changes in div "left-siebar-content"
"left-sidebar-content" conatins: 1.Input box (for aticle title) 2.Selection box (for language selection).

"initial-article-content" contains the default data which is visible when the webpage loaded on the user's browser. One can change its contents.

Error message is stored in a variable named "errormess" in ten differnet languages. In order to change the error message content, please change both the language code(key of array) like "hi/en/es/fr" and the value associated with this key.

In order to change color and size of loading symbol , please make appropiate changes in "wiki.css" -> .loading > div

Created by Utkarsh Prabhakar.
