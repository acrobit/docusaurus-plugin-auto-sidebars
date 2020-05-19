
<p >
<a href="https://www.npmjs.com/package/docusaurus-plugin-auto-sidebars"><img src="https://img.shields.io/npm/v/docusaurus-plugin-auto-sidebars.svg?style=flat" alt="npm version"></a>
</p>

## Installation

```bash
yarn add docusaurus-plugin-auto-sidebars
```

or

```bash
npm install docusaurus-plugin-auto-sidebars --save
```

## Usage
1. Create an empty `sidebars.auto.js` in the root of the project

2. Add this plugin to the `plugins` array in `docusaurus.config.js` :


```js
module.exports = {
  // ...
  plugins: [
    'docusaurus-plugin-auto-sidebars'
  ],
}
```
Or, if you want to specify a custom `docs` folder:

```js
module.exports = {
  // ...
  plugins: [
    ['docusaurus-plugin-auto-sidebars', {
      docs:'mydocs'
    }]
  ],
}
```
##### How to change the title of the folders?

Just add a `sidebars.yaml` in your `docs` folder:
```yaml
- folder1: 
  - Parent Folder One # First element is the title of parent, next elements are sub directories
  - subfolder1: Sub Folder One
  - subfolder2: Sub Folder Two
  
- folder2: 
  - Parent Folder Two # First element is the title
  - subfolder1: Sub Folder One
  - subfolder2: Sub Folder Two

```
##### How to change the order of the files and the folders?
**Method 1**: By adding a number to the beggining of files and folders
```shell
1.fileX.md
2.fileY.md
3.fileX.md
```  
Note : You can also use **negative numbers** to display them in reverse order : `-1. fileX.md`

**Method 2**: Define them in the `sidebars.yaml` file

```yaml
- folder1: 
  - Parent Folder One: 1 # the order number beside the title
  - subfolder1: Sub Folder One
  - subfolder2: Sub Folder Two
  
- folder2: 
  - Parent Folder Two: 2 # the order number beside the title
  - subfolder1: Sub Folder One
  - subfolder2: Sub Folder Two

```


