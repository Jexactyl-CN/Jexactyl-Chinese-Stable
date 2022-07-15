{{-- Pterodactyl - Panel which Sinicizated by iLwork.CN STUDIO --}}
{{-- Copyright (c) 2015 - 2017 Dane Everitt <dane@daneeveritt.com> --}}
{{-- Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn> --}}

{{-- This software is licensed under the terms of the MIT license. --}}
{{-- https://opensource.org/licenses/MIT --}}

@extends('layouts.admin')
@include('partials/admin.jexactyl.nav', ['activeTab' => 'theme'])

@section('title')
    Jexactyl Theme
@endsection

@section('content-header')
    <h1>Jexactyl 主题<small>配置 Jexactyl 使用的主题.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">管理</a></li>
        <li class="active">Jexactyl 设置</li>
    </ol>
@endsection

@section('content')
    @yield('jexactyl::nav')
    <div class="row">
        <div class="col-xs-12">
            <form action="{{ route('admin.jexactyl.theme') }}" method="POST">
                <div class="box box-info
                ">
                    <div class="box-header with-border">
                        <h3 class="box-title">选择系统主题 <small>Jexactyl 的主题选择.</small></h3>
                    </div>
                    <div class="box-body">
                        <div class="row">
                            <div class="form-group col-md-4">
                                <label class="control-label">启用</label>
                                <div>
                                    <select name="theme:current" class="form-control">
                                        <option @if ($current == 'default') selected @endif value="default">默认主题</option>
                                        <option @if ($current == 'dark') selected @endif value="dark">暗色主题</option>
                                        <option @if ($current == 'light') selected @endif value="light">亮色主题</option>
                                    </select>
                                    <p class="text-muted"><small>确定 Jexactyl 的 UI 主题.</small></p>
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
