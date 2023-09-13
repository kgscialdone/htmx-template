/**
 * HTMX Template Extension
 * by Katrina Scialdone (https://github.com/katrinakitten)
 * 
 * Enables HTMX to retrieve the contents of <template> elements rather than make an HTTP request.
 * 
 * <p hx-get="template:lorem" hx-trigger="load delay:3s">Loading...</p>
 * <template id="lorem">Lorem ipsum dolor sit amet...</template>
 * 
 * Note that in order to respect HTMX swapping rules, the template's innerHTML is used, rather than
 *   "properly" making a copy of its content nodes. This means, among other things, that <slot>
 *   elements will not work - this is not a web component, but rather a "faked" HTTP response body
 *   that is handled by HTMX in the same way as any other request.
 */
{
  let htmxApi

  htmx.defineExtension('template', {
    init(api) { htmxApi = api },

    onEvent(name, evt) {
      let path = evt.detail.path ?? evt.detail.requestConfig?.path

      if(path?.startsWith('template:')) switch(name) {
        // On beforeRequest, stop the normal process and manually continue without sending the request
        case 'htmx:beforeRequest': 
          htmxApi.triggerEvent(evt.detail.elt, 'htmx:beforeSend', evt.detail.responseInfo)
          evt.detail.xhr.onload()
          return false

        // On beforeSwap, replace the "request body" with the targeted template's innerHTML
        case 'htmx:beforeSwap':
          let tempName = path.slice(9)
          let template = document.querySelector(`template:is(#${tempName}, [name="${tempName}"], [data-name="${tempName}"])`)
          if(!template) console.error(`Requested template '${tempName}' does not exist`)
          else {
            evt.detail.shouldSwap = !!template
            evt.detail.serverResponse = template?.innerHTML
          }
          return true
      }
    }
  })
}
