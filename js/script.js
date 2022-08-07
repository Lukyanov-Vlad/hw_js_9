const TaskBook=function(){
    let counter=0;

    this.Init=function(param){
        console.log(param);
        const app=document.querySelector(`.${param}`);
        console.log(app);
        const container=document.createElement('div');
        container.classList.add('container');
        container.innerHTML=` 
                                    <div class="app">
                                        <h2 class="header">
                                            ToDo List
                                        </h2>
                                        <div class="main">
                                            <div class="create_task">
                                                <input type="text" name="task" placeholder="Введите задачу..." maxlength="50" minlength="3">
                                            </div>
                                            <ul class="task_list">
                                            </ul>
                                            <button class="clear_btn">Очистить список</button>
                                        </div>
                                        
                                    </div>`;
        app.appendChild(container);
    }
    this.createTask=function(value){
        let ul=document.querySelector('.task_list');
        
        let li=document.createElement('li');
        li.classList.add('list_item');
        li.innerHTML=`<div class="list_item_check">
                        <input type="checkbox" class="checkbox_input" name="name${counter}" id="task_input${counter}"><label class='checkbox_label' for="task_input${counter}"></label>
                    </div>
                    <span class="task_text" >${value}</span>`;
        ul.appendChild(li);
        this.addCrossEvent(li);
        this.addEditEvent(li);
        counter=counter+1;
    }
    this.addCrossEvent=function(elem){
        let label=elem.querySelector('.checkbox_label');
       
        label.addEventListener('click',()=>{
            this.Cross(elem);
        });
    }
    this.addEditEvent=(elem)=>{
        let taskText=elem.querySelector('.task_text');
        taskText.addEventListener('click',()=>{
            if(!taskText.classList.contains('cross_out')){
                if(confirm('Желаете изменить текст задачи')){
                    this.Edit(elem);
                };
            }

           
        });
    }
    this.Verification=(value)=>{
        let regExp=/[\[\]\{\}\|\&]/g;
        switch(true){
            case(value.length===0 || value.length===''):
                alert('Введена пустая строка.Повторите попытку.');
                return false;
            case(value.length<3):
                alert('Длина текста не должна быть меньше 3 символов.Повторите попытку.');
                return false;
            case(value.length>50):
                alert('Длина текста не должна быть больше 50 символов.Повторите попытку.');
                return false;
            case(regExp.test(value)):
                alert('Используются недопустимые символы.Повторите попытку.');
                return false;
            default: return true;

        }
    }
    this.Edit=(li)=>{
            
            let taskText=li.querySelector('.task_text');          
            let newTask=prompt('Введите новую задачу:');
            if(this.Verification(newTask)){
                taskText.innerHTML=newTask;
            }else{
                 this.Edit(li);
            }                         
    }
    this.Cross=function(li){
        let taskText=li.querySelector('.task_text');
        taskText.classList.toggle('cross_out');
    };
    this.ClearList=()=>{
        let ul=document.querySelector('.task_list');
        ul.innerHTML='';
        counter=0;
        
    }
}



window.addEventListener('load',function(){
    const taskBook=new TaskBook();
    taskBook.Init('site');
    const addTask=document.querySelector('.create_task input');
    console.log(addTask);
    let regExp=/[\[\]\{\}\|\&]/g;
    addTask.addEventListener('keyup',(event)=>{
       if(event.key==="Enter"){
                if(taskBook.Verification(addTask.value)){
                    taskBook.createTask(addTask.value);
                    addTask.value='';
                }else{
                    addTask.value='';
                }
                

        }
    });
    let clear=this.document.querySelector('.clear_btn');
    clear.addEventListener('click',taskBook.ClearList);
    
});










