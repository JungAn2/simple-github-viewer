import { defineStore } from "pinia";
import { AuthStore } from "./Auth";

export const contentStore = defineStore("contentStore", {
    state: () => ({
        content: '',
        img:'',
        display: true,
        useAuth: AuthStore(),
        darkModeStyle: ""
    }),
    getters: {
        getContent(state){
            return state.content
        },
        getImg(state){
            return state.img
        },
        getDisplay(state){
            return state.display
        },
    },
    actions: {
        setContent(data: any){
            this.content = data
        },
        setImg(address:string){
            this.img = address
        },
        setDisplay(bool: boolean){
            this.display = bool
        },

        /**
         * Convert marked syntex to html
         */
        markedToHTML() {
            if(this.useAuth.getDarkmode)
                this.darkModeStyle = " style=\"dark-mode\""
            //Headers
            this.content = this.content.replace(/#{1}\s?([^\n]+)\n/g, '<h1>$1</h1>')
            this.content = this.content.replace(/#{2}\s?([^\n]+)\n/g, '<h2>$1</h2>')
            this.content = this.content.replace(/#{3}\s?([^\n]+)\n/g, '<h3>$1</h3>')
            this.content = this.content.replace(/#{4}\s?([^\n]+)\n/g, '<h4>$1</h4>')
            this.content = this.content.replace(/#{5}\s?([^\n]+)\n/g, '<h5>$1</h5>')
            this.content = this.content.replace(/#{6}\s?([^\n]+)\n/g, '<h6>$1</h6>')

            //Bold
            this.content = this.content.replace(/\*{2}?([^\n]+)\*{2}\n/g, '<span style="font-weight: bold;">$1</span>')

            //Italic
            this.content = this.content.replace(/\*{1}?([^\n]+)\*{1}\n/g,'<span style="font-style: italic;"><span>')

            //Enter
            this.content = this.content.replace(/\n\n/g, '<br>')

            //``` code ``` will display in highlighed format
            this.content = this.content.replace(/\`{3}?([^\n]+)\`{3}\n/g, '<span style="background-color: yellow">$1</span>')

            
        },

        /**
         * Extra line on enter
         */
        organizeContent() {
            this.content = this.content.replace(/(?:\r\n|\r|\n)/g, '<br>')
        },
    }
})