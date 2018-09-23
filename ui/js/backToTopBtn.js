window.onscroll = function(){
    scrollTop()
}

function scrollTop(){
    if(this.document.body.scrollTop > 30 || this.document.documentElement.scrollTop > 30){
        this.document.getElementById("backToTop").style.display = "block";
    }
    else{
        this.document.getElementById("backToTop").style.display = "none";
    };
}

function backToTop() {
    document.body.scrollTop = 0;   // For Safari
    document.documentElement.scrollTop = 0;     //For Chrome, Moz, IE, Opera
}