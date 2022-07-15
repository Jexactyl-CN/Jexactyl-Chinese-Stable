{{-- Pterodactyl - Panel which Sinicizated by iLwork.CN STUDIO --}}
{{-- Copyright (c) 2015 - 2017 Dane Everitt <dane@daneeveritt.com> --}}
{{-- Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn> --}}

{{-- This software is licensed under the terms of the MIT license. --}}
{{-- https://opensource.org/licenses/MIT --}}

@extends('layouts.admin')
@include('partials/admin.jexactyl.nav', ['activeTab' => 'renewal'])

@section('title')
    Jexactyl 续订
@endsection

@section('content-header')
    <h1>Jexactyl 续订<small>设置 Jexactyl 的续订系统.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">管理</a></li>
        <li class="active">Jexactyl 设置</li>
    </ol>
@endsection

@section('content')
    @yield('jexactyl::nav')
    <div class="row">
        <div class="col-xs-12">
            <form action="{{ route('admin.jexactyl.renewal') }}" method="POST">
                <div class="box
                    @if($enabled == 'true')
                        box-success
                    @else
                        box-danger
                    @endif
                ">
                    <div class="box-header with-border">
                        <h3 class="box-title">服务器续订 <small>配置服务器续订设置.</small></h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="control-label">续订系统</label>
                                <div>
                                    <select name="enabled" class="form-control">
                                        <option @if ($enabled == 'false') selected @endif value="false">已禁用</option>
                                        <option @if ($enabled == 'true') selected @endif value="true">已启用</option>
                                    </select>
                                    <p class="text-muted"><small>确定用户是否必须续订其服务器.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">默认订阅时长</label>
                                <div>
                                    <div class="input-group">
                                        <input type="text" id="default" name="default" class="form-control" value="{{ $default }}" />
                                        <span class="input-group-addon">天</span>
                                    </div>
                                    <p class="text-muted"><small>确定服务器在第一次续订到期之前的天数.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">续订费用</label>
                                <div>
                                    <div class="input-group">
                                        <input type="text" id="cost" name="cost" class="form-control" value="{{ $cost }}" />
                                        <span class="input-group-addon">积分</span>
                                    </div>
                                    <p class="text-muted"><small>确定续订所花费的积分.</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    {!! csrf_field() !!}
                    <button type="submit" name="_method" value="PATCH" class="btn btn-sm btn-primary pull-right">保存更改</button>
                </div>
            </form>
        </div>
    </div>
@endsection
