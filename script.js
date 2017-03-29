var modal=(function(){

     let template=`<div class="modal" data-modal>
                    <div class="modal-content">
                        {{{content}}}
                    </div>
                    <div class"modal-buttons">
                     <button class="btn btn-primary" data-modal-accept>
                        {{{acceptButton}}}
                        </button>
                        <button class="btn" data-modal-close>
                        {{{closeButton}}}
                        </button>
                       
                    </div>
                </div>`;

    let config={
        name:'modal',
        bindings:{},
        content:'',
        autoOpen:false,
        closeButton:'cancel',
        acceptButton:'accept',
        onCancel:function(){return true},
        onAccept:function(){return true}
    }
    function setOptions(options){
        for (const prop in config){
            config[prop]=options[prop]||config[prop]
        }
    }
   
    return function(options){
        options=options||{};
        setOptions(options);
        
        const link=document.querySelector(`[data-${config.name}]`);
        let div=document.createElement('div');
        const display=()=>{div.style.display="block"};
        const hide=()=>{div.style.display="none"};

        div.classList.add('modal-container');
        div.dataset.modalContainer='';
        var renderedTemplate=Mustache.render(template,config);
        div.innerHTML=Mustache.render(renderedTemplate,config.bindings);
        document.body.appendChild(div);
        
        link.onclick=display;
        if(config.autoOpen){
            display()
        }

        div.onclick=(ev)=>{
            const targetData=ev.target.dataset;
            
            ev.preventDefault();
            if(targetData!==undefined)
            {
                
           
            if(targetData.modalContainer!==undefined){
                hide();
            }
            else if(targetData.modalClose!==undefined){
                if(config.onCancel())
                hide()
            }
            else if(targetData.modalAccept!==undefined){
                if(config.onAccept())
                hide()
            }
             }
        }
    }
})()

var myModal=new modal({
    name:'modal-conditions',
    content:'<h1>Terms and Conditions</h1><p>All copyright, trade marks, design rights, content, patents and other intellectual property belong to {{{company}}}</p>',
    bindings:{company:'this Company'},
    autoOpen:true,
    onAccept:()=>{console.log('accepted'); return false;}
})
