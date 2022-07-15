{{-- Pterodactyl - Panel which Sinicizated by iLwork.CN STUDIO --}}
{{-- Copyright (c) 2015 - 2017 Dane Everitt <dane@daneeveritt.com> --}}
{{-- Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn> --}}

{{-- This software is licensed under the terms of the MIT license. --}}
{{-- https://opensource.org/licenses/MIT --}}

@extends('layouts.admin')
@include('partials/admin.jexactyl.nav', ['activeTab' => 'registration'])

@section('title')
    Jexactyl 设置
@endsection

@section('content-header')
    <h1>用户注册<small>设置 Jexactyl 的用户注册功能设置.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">管理</a></li>
        <li class="active">Jexactyl 设置</li>
    </ol>
@endsection

@section('content')
    @yield('jexactyl::nav')
    <div class="row">
        <div class="col-xs-12">
            <form action="{{ route('admin.jexactyl.registration') }}" method="POST">
                <div class="box
                @if($enabled == 'true')
                    box-success
                @else
                    box-danger
                @endif
                ">
                    <div class="box-header with-border">
                        <h3 class="box-title">通过邮件注册 <small>允许用户使用邮件地址注册.</small></h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="control-label">启用</label>
                                <div>
                                    <select name="registration:enabled" class="form-control">
                                        <option @if ($enabled == 'false') selected @endif value="false">已禁用</option>
                                        <option @if ($enabled == 'true') selected @endif value="true">已启用</option>
                                    </select>
                                    <p class="text-muted"><small>决定用户是否可以通过邮箱注册账号.</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box
                @if($discord_enabled == 'true')
                    box-success
                @else
                    box-danger
                @endif
                ">
                    <div class="box-header with-border">
                        <h3 class="box-title">使用 Discord 注册 <small>允许用户使用邮件地址注册和登录.</small></h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="control-label">启用</label>
                                <div>
                                    <select name="discord:enabled" class="form-control">
                                        <option @if ($discord_enabled == 'false') selected @endif value="false">已禁用</option>
                                        <option @if ($discord_enabled == 'true') selected @endif value="true">已启用</option>
                                    </select>
                                    @if($discord_enabled != 'true')
                                        <p class="text-danger">如果禁用此功能，用户将无法使用 Discord 注册或登录!</p>
                                    @else
                                        <p class="text-muted"><small>确定人们是否可以使用 Discord 注册帐户.</small></p>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">Discord Client ID</label>
                                <div>
                                    <input type="text" class="form-control" name="discord:id" value="{{ $discord_id }}" />
                                    <p class="text-muted"><small>OAuth 应用程序的客户端 ID。 通常为 18-19 个数字.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">Discord Client Secret</label>
                                <div>
                                    <input type="text" class="form-control" name="discord:secret" value="{{ $discord_secret }}" />
                                    <p class="text-muted"><small>OAuth 应用程序的客户端密码.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">Discord Redirect URL</label>
                                <div>
                                    <input type="text" class="form-control" name="discord:redirect" value="{{ $discord_redirect }}" />
                                    <p class="text-muted"><small>Discord 登录成功后重定向到的 URL (回调 URL). 更改 <code>example.com</code> 为你的面板域名.</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box box-info">
                    <div class="box-header with-border">
                        <h3 class="box-title">默认资源 <small>注册时分配给用户的默认资源.</small></h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="control-label">CPU 数量</label>
                                <div>
                                    <input type="text" class="form-control" name="registration:cpu" value="{{ $cpu }}" />
                                    <p class="text-muted"><small>注册时应给予用户的 CPU 数量 %.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">RAM 运行内存大小</label>
                                <div>
                                    <input type="text" class="form-control" name="registration:memory" value="{{ $memory }}" />
                                    <p class="text-muted"><small>注册时应给予用户的 RAM 运行内存大小 MB.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">存储空间大小</label>
                                <div>
                                    <input type="text" class="form-control" name="registration:disk" value="{{ $disk }}" />
                                    <p class="text-muted"><small>注册时应给予用户的存储空间大小 MB.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">服务器位数量</label>
                                <div>
                                    <input type="text" class="form-control" name="registration:slot" value="{{ $slot }}" />
                                    <p class="text-muted"><small>注册时应给予用户的服务器位数量,决定用户一共可以创建几个服务器.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">网络分配数量</label>
                                <div>
                                    <input type="text" class="form-control" name="registration:port" value="{{ $port }}" />
                                    <p class="text-muted"><small>注册时应给予用户的网络分配数量.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">备份数量</label>
                                <div>
                                    <input type="text" class="form-control" name="registration:backup" value="{{ $backup }}" />
                                    <p class="text-muted"><small>注册时应给予用户的可用备份数量.</small></p>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label class="control-label">数据库数量</label>
                                <div>
                                    <input type="text" class="form-control" name="registration:database" value="{{ $database }}" />
                                    <p class="text-muted"><small>注册时应给予用户可以创建的数据库数量.</small></p>
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
