@section('users::nav')
    <div class="row">
        <div class="col-xs-12">
            <div class="nav-tabs-custom nav-tabs-floating">
                <ul class="nav nav-tabs">
                    <li @if($activeTab === 'overview')class="active"@endif><a href="{{ route('admin.users.view', ['user' => $user]) }}">概览</a></li>
                    <li @if($activeTab === 'storefront')class="active"@endif><a href="{{ route('admin.users.store', ['user' => $user]) }}">账户资源</a></li>
                </ul>
            </div>
        </div>
    </div>
@endsection