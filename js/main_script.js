var match = document.cookie.match(new RegExp("ChannelType=([^;]+)"));
if (match && match[1] === "1") {
    document.getElementById('headWrapper').remove();
    document.getElementById('headWrapper-mobile').remove();
    document.getElementById('footer').remove();
    document.getElementById('body').classList.add('mt-0');
    document.getElementById('heroSection').classList.add('mt-0');
    document.getElementById('bcg').classList.add('pb-0');
}

var generatedImageFile = null;

document.getElementById('shareButton').addEventListener('click', async function (e) {
    e.preventDefault();

    if (window.navigator.share) {
        window.navigator.share({
            files: [generatedImageFile],
        })
          .then()
          .catch();
      } else {
        var blobUrl = window.URL.createObjectURL(generatedImageFile);

        var link = document.createElement('a');
        link.href = blobUrl;
        link.download = generatedImageFile.name;

        link.click();

        URL.revokeObjectURL(blobUrl);
      }
});

const form = document.getElementById('form');
const alert = document.querySelector(".alert");
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    /*RESET REQUIRED*/
    document.getElementById('phoneError').classList.add('opa0')
    document.getElementById('personalizeTextError').classList.add('opa0')
    document.getElementById('gdprError').classList.add('opa0')

   let required_list = [];
    const phone = document.querySelector('input[name=phone]');
    const personalizeText = document.querySelector('textarea[name=personalize-text]');
    const gdpr = document.querySelector('input[name=gdpr]');


  /*  var phone_val = '';
    if (phone.value.trim() === '') {
        required_list.push(1);
        document.getElementById('phoneError').classList.remove('opa0');
        document.getElementById('inputPhone').classList.add('danger-border');
    } else {
        phone_val = phone.value
    }

    var personalize_text_val = '';
    if (personalizeText.value.trim() === '') {
        required_list.push(1);
        document.getElementById('personalizeTextError').classList.remove('opa0');
        document.getElementById('personalizeText').classList.add('danger-border');
    } else {
        personalize_text_val = personalizeText.value
    }
*/

  /*  if (gdpr.checked === false) {
        required_list.push(1);
        document.getElementById('gdprError').classList.remove('opa0');
    }*/


    if (required_list.includes(1)) {
        const first = document.querySelector('.error-span:not(.opa0)');
        first.scrollIntoView();
        first.scrollIntoView(false);
        first.scrollIntoView({block: "end"});
        first.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    } else {
        /*function resetMessage () {
            setTimeout(function() {
                var fadeTarget = document.querySelector('.submit-message');
                fadeTo(fadeTarget,0)
                document.querySelector('.send-form').removeAttribute("disabled");
            }, 4000);
        }*/
        $("#customText").html('')
        document.getElementById('scrollTo').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });

        setTimeout(function() {
            $('.glid').show(500);
            setTimeout(function() {
                $('.glid').hide(400);
                $("#customText").html($('#personalizeText').val())
                $("#shareImageText").html($('#personalizeText').val())

                /*  $("#customText").arctext({radius: 400, dir: -1})*/

                const content = document.getElementById('capture');

                html2canvas(content, {  onclone: function (clonedDoc) {
                        clonedDoc.getElementById('capture').style.display = 'block';
                    }
                }).then(function (canvas) {
                    canvas.toBlob(function (blob) {
                        generatedImageFile = new File([blob], 'krasne_vianoce.png', { type: 'image/png' });
                    });

                    document.body.appendChild(canvas)
                });
              
            }, 1000);
        }, 200);


        /*document.querySelector('.send-form').setAttribute('disabled','disabled');
        const time = formatTime(new Date(), 'dd-MM-yyyy-hh:mm:su')
        firebase.database().ref('' + time).set({
            name:name_val,
            city:city_val,
            email:email_val,
            tip:tipHour_val+':'+tipMinute_val+':'+tipSecond_val,
        }).then(() => {
            document.getElementById('submitText').textContent = 'Odoslanie formuláru prebehlo úspešne.'
            document.querySelector('.submit-message').classList.add("success");
            var fadeTarget = document.querySelector('.submit-message');
            fadeTo(fadeTarget,1)
            resetMessage ()
            form.reset();
        }).catch((error) => {
            //console.log("Database write failed", error);
            document.getElementById('submitText').textContent = 'Nastala chyba, skúste to neskôr.'
            document.querySelector('.submit-message').classList.add("error");
            var fadeTarget = document.querySelector('.submit-message');
            fadeTo(fadeTarget,1)
            resetMessage ()
            form.reset();
        });*/
    }
})
