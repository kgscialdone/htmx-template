# HTMX Template Extension
 
Enables HTMX to retrieve the contents of `<template>` elements rather than make an HTTP request.

```html
<p hx-get="template:lorem" hx-trigger="load delay:3s">Loading...</p>
<template id="lorem">Lorem ipsum dolor sit amet...</template>
```

Upon a request being made by HTMX, if the request path begins with `template:`, the extension will take over and retrieve the contents of the `<template>` element with a matching `id`, `name`, or `data-name` attribute, instead of making an HTTP request. 

This allows for keeping simple changes that don't require server-side processing entirely on the client side, which can increase performance, decrease bandwidth usage, and improve conceptual locality in your code.

## Installation
```html
<!-- From jsDelivr -->
<script src="https://cdn.jsdelivr.net/gh/katrinakitten/htmx-template@1.0.1/htmx-template.min.js"></script>

<!-- Or a local file -->
<script src="./htmx-template.min.js"></script>
```

Once the script is included, you'll need to use the `hx-ext` attribute to enable the extension. See [the HTMX docs](https://htmx.org/extensions/) for more information.
```html
<body hx-ext="template">
  <!-- Your content here -->
</body>
```
