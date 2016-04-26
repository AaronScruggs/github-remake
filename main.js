/**
 * Created by Aaron on 4/25/16.
 */

$(document).ready(function(){
    function githubUserInfo (username) {
    $.ajax({
        url: "https://api.github.com/users/" + username,
        method: "get",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Token 1a9612159310be3cd5026268888da5fda0196664");
        },
        success: successFunc
    });
        console.log(successFunc)
}

    function repoInfo (username) {
        $.ajax({
            url: "https://api.github.com/users/" + username + "/repos",
            method: "get",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Token 1a9612159310be3cd5026268888da5fda0196664");
            },
            success: repoFunc
        });

    }

    function successFunc(resp) {

        var datetime = resp.created_at;
        var splitDate = datetime.split("T");
        var date = splitDate.slice(0,1);

        var userProfile = `

<div id="personal">
        <div>
        <img src="${resp.avatar_url}" style="width:250px;height:250px;">
        <h2>${resp.name}</h2>
        <h3>${resp.login}</h3>
        </div>

    <div id="information">
            <ul>
                <li class="info_text"><i class="fa fa-map-marker"></i>    ${resp.location}</li>
                <li class="blueify info_text"><i class="fa fa-envelope-o blackify"></i>    ${resp.email}</li>
                
                <li class="info_text"><i class="fa fa-clock-o"></i>    ${date}</li>
            </ul>
    </div>

        <div id="metrics">
            <ul class="profile_list">
                <li class="metric_spacing">
                    <h1 class="blueify rating_item">${resp.followers}</h1>
                    <h6>Followers</h6>
                </li>
                <li class="metric_spacing">
                    <h1 class="blueify rating_item">0</h1>
                    <h6>Starred</h6>
                </li>
                <li class="metric_spacing">
                    <h1 class="blueify rating_item">${resp.following}</h1>
                    <h6>Following</h6>
                </li>

            </ul>
        </div>

</div>
`;

        $("#githubProfile").html(userProfile);
    }
    
    function repoFunc(resp) {



        var repos = `
        
        <div id="repos">
        <h3 class="repo_title fa fa-book">        Repositories</h3>
        <ul id='ulRepos'>
            
        </ul>
</div>
        `;

        $("#repoInfo").html(repos);
        
        resp.forEach(function(item){
            var datetime = item.updated_at;
            var splitDate = datetime.split("T");
            var date = splitDate.slice(0,1);
              $('#ulRepos').append(`<li><h3 class="blueify">${item.name}</h3></li>
                <li><h4>${item.description}</h4></li>
                <li class="repo_item"><h4>Updated ${date}</h4></li>`);
            })
    }
    
    

    function errorFunc(err) {
        console.log(err.responseText);
    }

    githubUserInfo("aaronscruggs");
    repoInfo("aaronscruggs");

});


