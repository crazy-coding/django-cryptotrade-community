var isAuthenticated = function () {
    if (window.localStorage.getItem('token')) {
        return window.localStorage.getItem('token');
    } else {
        return false;
    }
}

var alertMessage = function (message='Success', mode='success') {
    $('.alert-wrapper').append('<aside class="alert alert--'+mode+'"><span>'+message+'</span><button class="alert__close-btn" type="button" onclick="alertNote.close(this)"><svg class="alert__close-icon" width="30"><use xlink:href="/static/images/sprite.svg#times"></use></svg></button></aside>')
}

var login = function(e) {
    e.preventDefault();
    var data = $("#login_form").serialize();
    $.ajax({
        url: main_site_url + '/api-token-auth/',
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        success: function( data, textStatus, jQxhr ){
            window.localStorage.setItem('token', data.token);
            location.href = '/';
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
            alertMessage(JSON.parse(jqXhr.responseText).non_field_errors, 'warning')
        }
    });
}

var logout = function() {
    $.ajax({
        url: main_site_url + '/api-token-logout/',
        dataType: 'json',
        type: 'get',
        headers: {
            'Authorization': 'Token ' + isAuthenticated()
        },
        success: function( data, textStatus, jQxhr ){
            window.localStorage.removeItem('token');
            location.href = '/';
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
            alertMessage(JSON.parse(jqXhr.responseText).non_field_errors, 'warning')
        }
    });
}

var showPosts = function(url) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded',
        headers: {
            'Authorization': 'Token ' + isAuthenticated()
        },
        // data: data,
        success: function( data, textStatus, jQxhr ){
            var urlo = new URL(url);
            var type = urlo.searchParams.get("t")
            switch (type) {
                case 'new':
                    generatePostList('new_posts', data)
                    break;
                case 'top':
                    generatePostList('top_posts', data)
                    break;
                case 'search':
                    generatePostList('search_posts', data)
                    break;
                case 'my':
                    generateMyPostList('my_posts', data)
                    break;
            }

        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
            alertMessage(JSON.parse(jqXhr.responseText).non_field_errors, 'warning')
        }
    });
}

var generatePostList = function (posts_id, data) {
    var parent = $('#' + posts_id);
    var posts = '';
    var pagination = data.to_html;

    data.results.forEach(function (e, i) {
        var item = '' +
        '<article class="search-results__item post">' +
        '    <div class="post__inner">' +
        '        <div class="post__control">' +
        '            <button class="post__control-btn" type="button">' +
        '                <svg class="post__control-pinned-icon">' +
        '                    <use xlink:href="' + SPRITE + '#thumbtack"></use>' +
        '                </svg>' +
        '            </button>' +
        '            <button class="post__control-btn" type="button">' +
        '                <svg class="post__control-rate-icon">' +
        '                    <use xlink:href="' + SPRITE + '#caret-up"></use>' +
        '                </svg>' +
        '            </button>' +
        '            <button class="post__control-btn" type="button">' +
        '                <svg class="post__control-rate-icon">' +
        '                    <use xlink:href="' + SPRITE + '#caret-down"></use>' +
        '                </svg>' +
        '            </button>' +
        '        </div>' +
        '        <div class="post__wrapper">' +
        '            <header class="post__header">' +
        '                <h2 class="post__heading"><a class="post__heading-link" href="/community-single-post/' + e.id + '">' + e.title + '</a></h2>' +
        '                <button class="post__flag-btn" type="button">' +
        '                    <svg class="post__flag-icon">' +
        '                        <use xlink:href="' + SPRITE + '#flag"></use>' +
        '                   </svg>' +
        '                </button>' +
        '           </header>' +
        '            <p class="post__text show-more">' + e.beauty_context +
        '                <span class="show-more__hidden">' + e.hidden_context + '</span>' +
        '                <button class="show-more__btn js-hidden-text" type="button" onclick="hiddenText.toggle(this)">Read more</button>' +
        '            </p>' +
        '            <footer class="post__footer">' +
        '                <span class="post__footer-item">' +
        '                    <svg class="post__footer-icon">' +
        '                       <use xlink:href="' + SPRITE + '#caret-up"></use>' +
        '                    </svg>' +
        '                    <span>' + e.upvotes_count + ' people upvoted</span>' +
        '                </span>' +
        '                <span class="post__footer-item">' +
        '                    <svg class="post__footer-icon">' +
        '                        <use xlink:href="' + SPRITE + '#comment-dots"></use>' +
        '                    </svg>' +
        '                   <span> <a href="#">' + e.comments_count + ' comments</a></span>' +
        '                </span>' +
        '                <span class="post__footer-item">' +
        '                    <svg class="post__footer-icon">' +
        '                        <use xlink:href="' + SPRITE + '#clock"></use>' +
        '                    </svg>' +
        '                    <span>' + e.get_update_time + '</span>' +
        '                </span>' +
        '            </footer>' +
        '        </div>' +
        '    </div>' +
        '</article>'

        posts += item;
    });


    parent.find('.posts').html(posts);
    parent.find('.pagination').html(pagination);
}

var generateMyPostList = function(posts_id, data) {
    var parent = $('#' + posts_id);
    var posts = '';
    var pagination = data.to_html;

    data.results.forEach(function (e, i) {
        var item = '' +
        '<article class="posts__item post">' +
        '    <div class="post__inner">' +
        '       <div class="post__wrapper">' +
        '            <header class="post__header">' +
        '                <h2 class="post__heading"> ' +
        '                    <a class="post__heading-link" href="/community-single-post/' + e.id + '">' + e.title + '</a>' +
        '                </h2>' +
        '                <div class="post__extra-buttons">' +
        '                    <a class="post__extra-btn btn btn--theme-4" href="/community-create-post/' + e.id + '">EDIT POST</a>' +
        '                    <a class="post__extra-btn btn btn--theme-4" href="/community-single-post/' + e.id + '">VIEW POST</a>' +
        '                </div>' +
        '            </header>' +
        '            <p class="post__text show-more">' + e.beauty_context +
        '                <span class="show-more__hidden">' + e.hidden_context + '</span>' +
        '                <button class="show-more__btn js-hidden-text" type="button" onclick="hiddenText.toggle(this)">Read more</button>' +
        '            </p>' +
        '        </div>' +
        '    </div>' +
        '</article>'

        posts += item;
    });


    parent.find('.posts').html(posts);
    parent.find('.pagination').html(pagination);

    
}