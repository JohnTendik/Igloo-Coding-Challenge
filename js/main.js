// Your code here ...

(function(){

    function get_new_members(){
        var requests = new ApiGetClient({
            "apibaseurl":"https://randomuser.me/",
            "apipath":"api/",
            "queryparams": {"results":"5"}
        });

        requests.xhr.onreadystatechange = function() {
            if (requests.xhr.readyState == XMLHttpRequest.DONE) {
                
                if(requests.xhr.status !== 200){
                    alert('Sorry, looks like we\'re having some difficulties contacting the members API. Please try again later.')
                }

                var jsonData = JSON.parse(requests.xhr.responseText);

                if(jsonData.error){
                    alert(jsonData.error);
                }

                append_new_members(jsonData);
            }
        }
    }

    function append_new_members(data){
        console.log(data);
        var member_container = document.getElementById('members_container');
        var new_list = document.createElement("ul");
        new_list.className = "members_list_container section group";

        for(var i = 0; i < data.results.length; i++){
            var firstName = data.results[i].name.first.charAt(0).toUpperCase() + data.results[i].name.first.slice(1);
            var lastName = data.results[i].name.last.charAt(0).toUpperCase() + data.results[i].name.last.slice(1);
            
            var listItem = document.createElement('li');
            listItem.className = "col span_1_of_5";

            var p = document.createElement('p');
            p.innerText = firstName + " " + lastName;

            var span = document.createElement('span');
            span.innerText = data.results[i].email;

            var img = document.createElement('img');
            img.src = data.results[i].picture.large;

            listItem.appendChild(img);
            listItem.appendChild(p);
            listItem.appendChild(span);

            new_list.appendChild(listItem);
        }

        member_container.appendChild(new_list);

        document.getElementById('js-btn-action-more').classList.remove('loading');
    }

    get_new_members();

    document.getElementById('js-btn-action-more').addEventListener('click', function(event) {
        event.preventDefault(); // Stop the click from moving the page up.
        this.classList.add('loading');
        get_new_members();
    });

})()