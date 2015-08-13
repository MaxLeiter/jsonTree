# jsonTree
A lightweight vanilla Javascript micro-library for making collapsible trees with JSON

## usage

  ```
  jsonTree(link, selector)
  ```

Because jsonTree uses document.querySelector(selector), selector can either be an ID or class, just be sure to specify with the proper identifier (. for class and # for ID).

The link must be properly formatted (http://, etc), as XMLHttpRequests are annoying that way.
