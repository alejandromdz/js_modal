const modal={
    
    init:function(){
        const element=document.getElementById('modal');
        const template=document.getElementById('template')
        const rendered=Mustache.render(template.innerHTML,{name:'Thou'});
        element.innerHTML=rendered;
        element.onclick=this.clickHandler
    },
    clickHandler:function(ev){
        const target=ev.target;
        if(target.dataset.modalClose!==undefined)
        {
            console.log('close');
        }
    },
    hidden:true

}
modal.init()
