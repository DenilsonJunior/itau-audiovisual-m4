define(["jquery","components/utils"],(s,e)=>{"use strict";var r=""!=e.getParameterByName("mode")?e.getParameterByName("mode"):"user",o=window.Postits||{};(o=function(e,t){this.element=e,this.header=t.find("header")}).prototype.download=function(){this.tema=s(this.element).data("tema");var e=s("<div>");e.append(this.header[0].outerHTML),e.append(s(this.element).clone().html()),e.attr("id","print-div"),e.addClass("print-div"),e.find(".tela").addClass("tela-ativa completed no-interaction-lock").removeClass("locked");var t=s("<div>");t.append(e);e="",t=`<head>
        <link href="../../assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="../../assets/css/rSlider.min.css" rel="stylesheet">
        <link href="../../assets/css/styles.min.css" rel="stylesheet">    
        <link href="../../assets/css/print.min.css" rel="stylesheet">    
        ${e=this.tema?'<link href="../../assets/css/'+this.tema+'.min.css" rel="stylesheet">':e}
        <script>var mode = '${r}';</script>
        </head>
        <body class="print-body mode-${r}">
            <div class="msg-aguarde-print">
                <p>Gerando versão para impressão. Por favor aguarde.</p>
                <p>
                    <button id="bt-cancelar-print">Cancelar</button>
                </p>
            </div>
            ${t[0].outerHTML}
            <script src="../../assets/js/frameworks/jquery-latest.min.js"></script>
            <script src="../../assets/js/frameworks/player.min.js"></script>
            <script src="../../assets/js/components/tools/print.min.js"></script>

            <script>                    
                    window.addEventListener("beforeprint", function(){
                        
                    })
                    window.addEventListener("afterprint", function(){
                        window.close();
                    })                    
                    </script>
        </body>
                    `;window.open("","","width=500").document.write(`<html>
                ${t}                
            </html>`)},o.prototype.openPopup=function(e){e="<html>"+("<head><link rel='stylesheet' type='text/css' href='../../assets/css/styles.min.css'><link rel=\"stylesheet\" type=\"text/css\" href=\"../../assets/css/print.min.css\"><link rel='stylesheet' type='text/css' href='../../assets/css/bootstrap.min.css'>"+'<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script></head><body class=\'print-body\'>'+e+"</body>"+`<script>
        setTimeout(() => {
            // var worker = html2pdf().from(document.getElementById('tela-2')).save();            
            var opt = {
                margin: 0,
                filename: 'test-A4.pdf',
                image: { type: 'jpeg', quality: 0.98},
                html2canvas: { scale: 1, width: 2880 },
                jsPDF: { unit: 'pt', format: 'A4', orientation: 'landscape'},
                pagebreak: {after: '.test-item--page-break'}
            };
    
            html2pdf().from(document.getElementById('tela-2')).set(opt).save();
        }, 1000);
        </script>`)+"</html>";window.open("print","","width=500").document.write(e)},s.fn.PDF=function(e){for(var t,s=this,r=e,i=Array.prototype.slice.call(arguments,1),a=s.length,n=0;n<a;n++)if("object"==typeof r||void 0===r?s[n].PDF=new o(s[n],r):t=s[n].PDF[r].apply(s[n].PDF,i),void 0!==t)return t;return s}});