import React, { Component } from 'react';
// Import the library
// import Datetime from 'react-datetime';
// import "react-datetime/css/react-datetime.css";
 
// // return it from your components
// return <Datetime />;

// Rich Text
// import 'suneditor/dist/css/suneditor.min.css'
// import suneditor from 'suneditor'
// import plugins from 'suneditor/src/plugins'


// const options = {
// 	"defaultTag": "div",
// 	"textTags": {
// 		"bold": "b",
// 		"underline": "u",
// 		"italic": "i",
// 		"strike": "s"
// 	},
// 	"value": "",
// 	"mode": "classic",
// 	"rtl": false,
// 	"katex": "window.katex",
// 	"charCounter": true,
// 	"font": [
// 		"Arial",
// 		"tahoma",
// 		"Courier New,Courier"
// 	],
// 	"fontSize": [
// 		8,
// 		10,
// 		14,
// 		18,
// 		24,
// 		36
// 	],
// 	"formats": [
// 		"p",
// 		"blockquote",
// 		"h1",
// 		"h2",
// 		"h3"
// 	],
// 	"colorList": [
// 		[
// 			"#ff0000",
// 			"#ff5e00",
// 			"#ffe400",
// 			"#abf200"
// 		],
// 		[
// 			"#00d8ff",
// 			"#0055ff",
// 			"#6600ff",
// 			"#ff00dd"
// 		]
// 	],
// 	"imageResizing": false,
// 	"imageHeightShow": false,
// 	"imageFileInput": false,
// 	"imageUrlInput": false,
// 	"videoResizing": false,
// 	"videoHeightShow": false,
// 	"videoFileInput": false,
// 	"videoUrlInput": false,
// 	"videoRatioShow": false,
// 	"audioUrlInput": false,
// 	"tabDisable": false,
// 	"shortcutsDisable": [
// 		"bold",
// 		"strike",
// 		"underline",
// 		"italic",
// 		"undo",
// 		"indent"
// 	],
// 	"mediaAutoSelect": false,
// 	"buttonList": [
// 		[
// 			"undo",
// 			"redo",
// 			"font",
// 			"fontSize",
// 			"formatBlock",
// 			"paragraphStyle",
// 			"blockquote",
// 			"bold",
// 			"underline",
// 			"italic",
// 			"strike",
// 			"subscript",
// 			"superscript",
// 			"fontColor",
// 			"hiliteColor",
// 			"textStyle",
// 			"removeFormat",
// 			"outdent",
// 			"indent",
// 			"align",
// 			"horizontalRule",
// 			"list",
// 			"lineHeight",
// 			"table",
// 			"link",
// 			"image",
// 			"video",
// 			"audio",
// 			"math",
// 			"imageGallery",
// 			"fullScreen",
// 			"showBlocks",
// 			"codeView",
// 			"preview",
// 			"print",
// 			"save",
// 			"template"
// 		]
// 	],
// 	// "lang": SUNEDITOR_LANG.en,
// 	"lang(In nodejs)": "en"
// }


class TestPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {  }
    // }
	// componentDidMount() {
	// 	suneditor.create('sample', options)
	// }
	handleSubmit(event){
		event.preventDefault();
		console.log(event.target)
	}
    render() { 
        return (  
            <form onClick={this.handleSubmit}>
                {/* <textarea id='sample' name="content"/> */}
				{/* <label for="birthdaytime">Birthday (date and time):</label>
 			 <input type="datetime-local" name="birthdaytime"></input> */}
			  {/* <DateTime/> */}
				<button type="submit">Submit</button>
				
            </form>
        );
    }
}
 
export default TestPage;

