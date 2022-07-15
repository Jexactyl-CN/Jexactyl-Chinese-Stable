{{-- Pterodactyl - Panel which Sinicizated by iLwork.CN STUDIO --}}
{{-- Copyright (c) 2015 - 2017 Dane Everitt <dane@daneeveritt.com> --}}
{{-- Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn> --}}

{{-- This software is licensed under the terms of the MIT license. --}}
{{-- https://opensource.org/licenses/MIT --}}

@extends('layouts.admin')
@include('partials/admin.jexactyl.nav', ['activeTab' => 'index'])

@section('title')
    Jexactyl 设置
@endsection

@section('content-header')
    <h1>Jexactyl 设置<small>配置 Jexactyl 功能.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">管理</a></li>
        <li class="active">Jexactyl 设置</li>
    </ol>
@endsection

@section('content')
    @yield('jexactyl::nav')
    <div class="row">
        <div class="col-xs-12">
            <div class="box
                @if($version->isLatestPanel())
                    box-success
                @else
                    box-danger
                @endif
            ">
                <div class="box-header with-border">
                    <h3 class="box-title">软件校验通过 <small>此 翼龙中国 | Jexactyl 分支为最新版本.</small></h3>
                </div>
                <div class="box-body">
                    @if ($version->isLatestPanel())
                        你正在运行 翼龙中国 | Jexactyl <code>{{ config('app.version') }}</code>. 
                    @else
                        你正在运行的 翼龙中国 | Jexactyl 版本并非最新版. 最新版 <a href="https://github.com/Jexactyl-CN/Jexactyl-Chinese-Stable/releases/v{{ $version->getPanel() }}" target="_blank"><code>{{ $version->getPanel() }}</code></a>.
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
