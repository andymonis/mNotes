/**
 * UI
 * 
 */
class _UI {
    /**
     * 
     */
    constructor(){
        // **private** collection of all binding to allow refreshing entire display
        this.bindings = {};
        // **private** form elements that accept 'value' instead of inner html
        this.FORM_ELEMENTS = [ "fieldset", "input", "object", "output", "select", "textarea" ];
    }

    /**
     * Register a new binder to a selector
     * @param {*} selector 
     * @param {*} binder 
     */
    bind( selector, binder ){
        // Determine the el
        let el = document.querySelector(selector);
        // Store the renderer and the selector
        this.bindings[selector] = { el, binder };
        // Refresh the binding for the first time
        this.refreshBinding(selector);
    }

    /**
     * Refresh a specific binding
     * @param {*} name 
     */
    refreshBinding(name){
        let binding = this.bindings[name];
        // Clear the current inner 
        binding.el.innerHTML = "";
        // Generate the nodes
        let nodes = binding.binder.render();
        // Append the node to the parent
        binding.el.appendChild( nodes );
    }

    /**
     * Refreshes all of the bindings
     */
    refresh(){
        // Iterate over all of the bindings
        for( var key in this.bindings ){
            this.refreshBinding( key );
        }
    }

    /**
     * Apply any option specific features
     * @param {*} options 
     */
    options( e, options ){
        for( var key in options ){
            // test for 'on' being the first characters and map to a handler
            if( key.indexOf('on') === 0 ){
                // Treat as special handler
                let name = key.substring( 2 );
                e.addEventListener( name, options[ key ] );
            } else {
                // Normal Attribute
                e.setAttribute( key, options[key] );
            }
        }

        // Apply any options
        if( options.click) e.addEventListener('click', options.click );

    }

    /**
     * Creates a new Element
     * @param {*} tag string of the tag name
     * @param {*} options map of options
     * @param {*} inner Could be text <p>inner</p> or more tags <p><span>inner</span></p>
     */
    h( tag, options, inner ){

        // Create the new tag element
        let e = document.createElement( tag );
        // Apply any options
        this.options( e, options );

        if( typeof inner === "string" ){
            if( this.FORM_ELEMENTS.indexOf( tag ) > -1 ){
                // Set the VALUE to the text 
                e.value = inner
            } else {
                // Set the INNER_HTML to the text
                e.innerHTML = inner;
            }
        } else {
            // Loop through any children
            for( var key in inner ){
                // Append the children to the element
                e.appendChild( inner[ key ] );
            }
        }
        // return element
        return e;
    }
}

// Create an instance of UI
const UI = new _UI();

// Export instance
export default UI;