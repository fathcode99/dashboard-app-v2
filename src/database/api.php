<?php

use App\Http\Controllers\ApplypengajarController;
use App\Http\Controllers\BiayapengajardansiswaController;
use App\Http\Controllers\DataorangtuadansiswaController;
use App\Http\Controllers\DatapengajarController;
use App\Http\Controllers\GambariklanController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NotifyadminController;
use App\Http\Controllers\NotifypengajarController;
use App\Http\Controllers\PengeluaranlbbController;
use App\Http\Controllers\SelisihController;
use App\Http\Controllers\TeksiklanController;
use App\Http\Controllers\TotalbiayaController;
use App\Http\Controllers\TotalrealisasiController;

// use App\Models\Notifypengajar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
 |--------------------------------------------------------------------------
 | API Routes
 |--------------------------------------------------------------------------
 |
 | Here is where you can register API routes for your application. These
 | routes are loaded by the RouteServiceProvider within a group which
 | is assigned the "api" middleware group. Enjoy building your API!
 |
 */


Route::post('login', [LoginController::class, 'login']);

Route::group(
    ['middleware' => 'auth:sanctum'], function () {
        Route::group(
            ['middleware' => 'isAdmin'], function () {
                    Route::get('biaya', [BiayapengajardansiswaController::class, 'index']);
                    Route::put('biaya/{biaya}/update', [BiayapengajardansiswaController::class, 'update']);
                    Route::delete('biaya/{biaya}/delete', [BiayapengajardansiswaController::class, 'destroy']);
                    Route::get('pengeluaran', [PengeluaranlbbController::class, 'index']);
                    Route::post('pengeluaran', [PengeluaranlbbController::class, 'store']);
                    Route::put('pengeluaran/{pengeluaran}/update', [PengeluaranlbbController::class, 'update']);
                    Route::delete('pengeluaran/{pengeluaran}/delete', [PengeluaranlbbController::class, 'destroy']);
                    Route::get('realisasi', [TotalrealisasiController::class, 'index']);
                    Route::post('realisasi', [TotalrealisasiController::class, 'store']);
                    Route::delete('realisasi/{realisasi}/delete', [TotalrealisasiController::class, 'destroy']);
                    Route::get('totalbiaya', [TotalbiayaController::class, 'index']);
                    Route::post('totalbiaya', [TotalbiayaController::class, 'store']);
                    Route::delete('totalbiaya/{totalbiaya}/delete', [TotalbiayaController::class, 'destroy']);
                    Route::get('selisih', [SelisihController::class, 'index']);
                    Route::post('selisih', [SelisihController::class, 'store']);
                    Route::delete('selisih/{selisih}/delete', [SelisihController::class, 'destroy']);

                    Route::get('apply', [ApplypengajarController::class, 'index']); //sudah
                    Route::delete('apply/{apply}/delete', [ApplypengajarController::class, 'destroy']); //tidak bisa status 200 tp data tidak terhapus

                    Route::post('gambar', [GambariklanController::class, 'store']);
                    Route::put('gambar/{gambar}/update', [GambariklanController::class, 'update']);
                    Route::delete('gambar/{gambar}/delete', [GambariklanController::class, 'destroy']);
                    Route::post('teks', [TeksiklanController::class, 'store']);
                    Route::put('teks/{teks}/update', [TeksiklanController::class, 'update']);
                    Route::delete('teks/{teks}/delete', [TeksiklanController::class, 'destroy']);

                    Route::get('datapengajar', [DatapengajarController::class, 'index']); //bisa sudah
                    Route::delete('datapengajar/{datapengajar}/delete', [DatapengajarController::class, 'destroy']); //bisa
                    
                    Route::get('dataortusiswa', [DataorangtuadansiswaController::class, 'index']);
                    Route::delete('dataortusiswa/{dataortusiswa}/delete', [DataorangtuadansiswaController::class, 'destroy']);
                }
        );
        Route::get('logout', [LoginController::class, 'logout']);
        Route::get('biaya/{biaya}', [BiayapengajardansiswaController::class, 'show']);
        Route::post('biaya', [BiayapengajardansiswaController::class, 'store']);
        Route::post('apply', [ApplypengajarController::class, 'store']);
        Route::get('notifypengajar/{notifypengajar}', [NotifypengajarController::class, 'show']);
        Route::get('notifypengajar', [NotifypengajarController::class, 'index']);
        Route::post('notifypengajar', [NotifypengajarController::class, 'store']);
        Route::delete('notifypengajar/{notifypengajar}/delete', [NotifypengajarController::class, 'destroy']);
        Route::get('notifyadmin/{notifyadmin}', [NotifyadminController::class, 'show']);
        Route::get('notifyadmin', [NotifyadminController::class, 'index']);
        Route::post('notifyadmin', [NotifyadminController::class, 'store']);
        Route::delete('notifyadmin/{notifyadmin}/delete', [NotifyadminController::class, 'destroy']);
        Route::get('gambar', [GambariklanController::class, 'index']);
        Route::get('teks', [TeksiklanController::class, 'index']);

        Route::post('datapengajar', [DatapengajarController::class, 'store']); // bisa sudah
        Route::get('datapengajar/{datapengajar}', [DatapengajarController::class, 'show']); //bisa sudah

        Route::put('datapengajar/{datapengajar}/update', [DatapengajarController::class, 'update']);

        Route::get('dataortusiswa/{dataortusiswa}', [DataorangtuadansiswaController::class, 'show']);
        Route::post('dataortusiswa', [DataorangtuadansiswaController::class, 'store']);
        Route::put('dataortusiswa/{dataortusiswa}/update', [DataorangtuadansiswaController::class, 'update']);
    }
);

Route::middleware('auth:sanctum')->get(
    '/user', function (Request $request) {
        return $request->user();
    }
);