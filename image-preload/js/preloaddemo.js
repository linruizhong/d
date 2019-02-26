/**
 * Created by Administrator on 2019/2/26.
 */
(function($){
    function PreLoad(imgs,options) {
        this.imgs=(typeof imgs ==='string') ? [imgs]:imgs;
        this.opts=$.extend({},PreLoad.DEFAULTS,options);
        if(this.opts.order==='ordered'){
            this._ordered();
        }else{
            this._unordered();
        }
    }
    PreLoad.DEFAULTS={
        order:'unordered',
        each:'',
        all:''
    }
    PreLoad.prototype._unordered=function(){
        var imgs=this.imgs,
            opts=this.opts,
            count=0,
            len=imgs.length;
        $.each(imgs,function(i,src){
            if(typeof src !='string'){
                return;
            }
            var newObj=new Image();
            $(newObj).on('load error',function(){
                opts.each && opts.each(count);
                if (count>=len-1){
                  opts.all && opts.all();
                }
                count++;
            });
            newObj.src=src;
        })
    }
    PreLoad.prototype._ordered=function(){
          var imgs=this.imgs,
              opts=this.opts,
              count=0,
              len=imgs.length;
           load();
           function load(){
               var newObj=new Image();
               $(newObj).on('load eror',function(){
                   opts.each && opts.each(count);
                   if (count>=len){
                       opts.all && opts.all();
                   }else {
                       load();
                   }
                   count++;
               })
               newObj.src=imgs[count];
           }
    }
    $.extend({
        preload:function(imgs,opts){
            new PreLoad(imgs,opts);
        }
    })
})(jQuery)
