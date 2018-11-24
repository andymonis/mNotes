/**
 * [AOSReducerStore description]
 * @constructor
 */
class Red{
    constructor( reducer, initialState ){
    // **property** {Reducer} reducer
    this.reducer = reducer;
    // **property** {JSON} state The current model state
    this.state = initialState || undefined;
    // **private** {callbacks} _subscribers A list of callbacks for state changes
    this._subscribers = {};
    // **private** {int} _count Counter to provide a unique callback id.
    this._count = 0;
  }

  
  /**
   * ### dispatch
   * @param  {[type]} action [description]
   * @return {[type]}        [description]
   */
  dispatch( action ){
    // Update the state with the reducer§
    this.state = this.reducer( this.state, action );
    // Notify subscribers
    this.notify( this.getState(), action );
  };
  
  /**
   * ### getState
   * @return {[type]} [description]
   */   
  getState(){
    // Deep Clone the state to make immutable
    return JSON.parse( JSON.stringify( this.state ) );
  };
  
  /**
   * ### subscribe
   * @param  {Function} fn [description]
   * @return {[type]}      [description]
   */
  subscribe( fn ){
    // Create a unique id for the subscriber
    var myid = ++this._count;
    // Add subscriber to a collection
    this._subscribers[ myid ] = fn;
  
    // Return an unsubscriber
    return function(){
      delete this._subscribers[ myid ];
    };
  };
  
  /**
   * ### notify
   * @param  {[type]} state  [description]
   * @param  {[type]} action [description]
   * @return {[type]}        [description]
   */
  notify( state, action ){
    for( var key in this._subscribers ){
      this._subscribers[ key ]( state, action );
    }
  };

}

function createStore( reducer, state ){
    // Create the store
    var store = new Red( reducer, state );
    // Fire initial setup
    store.dispatch();
    // Return the store
    return store;
};

export { createStore }
  