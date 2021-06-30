import React, { Component } from 'react';

class Notification extends Component {
    state = {  }
    render() { 
        return ( 
            <div aria-live="polite" aria-atomic="true" style={{position: 'relative', minHeight: '200px', border:"1px"}} data-delay="1">
                <div className="toast" style={{position: 'absolute', bottom: '0', right: '0'}}>
                    <div className="toast-header">
                        <strong className="mr-auto">Note</strong>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                    <div className="toast-body">
                        Please allow all cookies , if you want to use our services!
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Notification;