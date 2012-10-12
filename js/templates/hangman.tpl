<table class="table table-bordered">
    <thead>
        <tr>
            <th>Letter</th>
            <th>Accepted</th>
        </tr>
    </thead>
    <tbody>
        <% for(var i = 0; i < letters.length; i++) { %>
            <%= letters[i].render() %>
        <% } %>
    </tbody>
</table>
