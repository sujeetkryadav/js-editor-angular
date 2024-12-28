import { Component, ElementRef } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  language = 'html';
  title = 'js-code-editor';
  finalMsg: any = [];
  error: any;
  selectedTheme: string = 'vs';
  editorOptions = { theme: this.selectedTheme, language: 'javascript' };
  editorOptionsHTML = { theme: this.selectedTheme, language: 'html' };
  editorOptionsCSS = { theme: this.selectedTheme, language: 'css' };
  editorOptionsJSON = { theme: this.selectedTheme, language: 'json' };
  themes: any = [{ name: 'Light', value: 'vs' }, { name: 'Dark', value: 'vs-dark' }, { name: 'Black', value: 'hc-black' }];

  code: string = 'console.log("Hello world!");\n';
  htmlCode: string = '<h1>Hello World</h1>';
  cssCode: string = 'h1 { color: red; }';
  jsonCode: string = "";
  isConsoleOpen: boolean = false;
  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {

  }
  /**
   * Discription: This function is used to get the code from the editor
   * @param e 
   */
  onInit(e: any) {
    //console.log(e.layout)
  }
  /**
   * Discription: This function is used to run the code
   */
  run() {
    this.overridedConsole();

    let css = document.createElement('style');
    css.innerHTML = this.cssCode;
    this.elementRef.nativeElement.querySelector('#html-result').innerHTML = this.htmlCode;
    this.elementRef.nativeElement.querySelector('#html-result').appendChild(css);
    setTimeout(() => { eval(this.code); }, 10);

  }
  /**
   * Discription: This function is used to override the console.log and console.error
   */
  overridedConsole() {
    //this.finalMsg = []
    const originalConsoleLog = console.log;
    window.console.log = (...message: any) => {
      console.info(...message);
      this.finalMsg.push(message);
      this.jsonCode = JSON.stringify(message);
      //originalConsoleLog.apply(console, message);
    };
  }
  /**
   * Discription: This function is used to resize the editor
   */
  toggleConsole() {
    this.elementRef.nativeElement.querySelector('.console_wrapper').style.height = this.isConsoleOpen ? '20px' : '200px';
    this.isConsoleOpen = !this.isConsoleOpen;
  }
  /**
   * Discription: This function is used to change the theme of the editor
   * @param e 
   */
  changeTheme(e: any) {
    this.selectedTheme = e.target.value;
    this.editorOptions = { theme: this.selectedTheme, language: 'javascript' };
    this.editorOptionsHTML = { theme: this.selectedTheme, language: 'html' };
    this.editorOptionsCSS = { theme: this.selectedTheme, language: 'css' };
    this.editorOptionsJSON = { theme: this.selectedTheme, language: 'json' };
  }
  /**
   * DIscription: This function is used to clear the console
   */
  clearConsole() {
    this.finalMsg = [];

  }
}
