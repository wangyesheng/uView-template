# uview-template

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### get dom

```
mounted() {
  this.$nextTick(() => {
    uni
      .createSelectorQuery()
      .in(this)
      .select(".tabbar-wrap")
      .boundingClientRect((data) => {
        this.tabbarHeight = data.height;
      })
      .exec();
  });
},
```
