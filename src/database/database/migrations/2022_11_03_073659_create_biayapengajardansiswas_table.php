<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('biayapengajardansiswas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('id_pengajar');
            $table->unsignedBigInteger('id_siswa');
            $table->string('nama_pengajar');
            $table->string('nama_siswa');
            $table->string('nama_orang_tua');
            $table->string('regional');
            $table->unsignedBigInteger('durasi_lembur');
            $table->unsignedBigInteger('biaya_fotokopi');
            $table->unsignedBigInteger('tagihan_siswa');
            $table->unsignedBigInteger('biaya_pendaftaran');
            $table->unsignedBigInteger('fee_pengajar');
            $table->unsignedBigInteger('realisasi_tagihan_siswa');
            $table->unsignedBigInteger('realisasi_fee_pengajar');
            $table->unsignedBigInteger('realisasi_biaya_pendaftaran');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('biayapengajardansiswas');
    }
};
