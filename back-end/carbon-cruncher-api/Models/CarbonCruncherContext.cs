using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace carbon_cruncher_api.Models;

public partial class CarbonCruncherContext : DbContext
{
    public CarbonCruncherContext()
    {
    }

    public CarbonCruncherContext(DbContextOptions<CarbonCruncherContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Visu1Annual> Visu1Annual { get; set; }

    public virtual DbSet<Visu1Monthly> Visu1Monthly { get; set; }

    public virtual DbSet<Visu2Annual> Visu2Annual { get; set; }

    public virtual DbSet<Visu2Icecore> Visu2Icecore { get; set; }

    public virtual DbSet<Visu2Monthly> Visu2Monthly { get; set; }

    public virtual DbSet<Visu3Event> Visu3Event { get; set; }

    public virtual DbSet<Visu3Global> Visu3Global { get; set; }

    public virtual DbSet<Visu4Co2> Visu4Co2 { get; set; }

    public virtual DbSet<Visu5Co2sector> Visu5Co2sector { get; set; }

    public virtual DbSet<Visu5Co2sub> Visu5Co2sub { get; set; }

    public virtual DbSet<VisuInfo> VisuInfos { get; set; }

    public virtual DbSet<VisuUser> VisuUsers { get; set; }

    public virtual DbSet<VisuUserVisual> VisuUserVisuals { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Visu1Annual>(entity =>
        {
            entity.ToTable("visu1_annual");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AnomalyGlobal).HasColumnName("anomaly_global");
            entity.Property(e => e.AnomalyNorthern).HasColumnName("anomaly_northern");
            entity.Property(e => e.AnomalySouthern).HasColumnName("anomaly_southern");
            entity.Property(e => e.TempReconstruction).HasColumnName("temp_reconstruction");
            entity.Property(e => e.TimeYear).HasColumnName("time_year");
        });

        modelBuilder.Entity<Visu1Monthly>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("visu1_monthly");

            entity.Property(e => e.AnomalyGlobal).HasColumnName("anomaly_global");
            entity.Property(e => e.AnomalyNorthern).HasColumnName("anomaly_northern");
            entity.Property(e => e.AnomalySouthern).HasColumnName("anomaly_southern");
            entity.Property(e => e.TimeYearMonth)
                .HasColumnType("date")
                .HasColumnName("time_year_month");
        });

        modelBuilder.Entity<Visu2Annual>(entity =>
        {
            entity.ToTable("visu2_annual");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Mean).HasColumnName("mean");
            entity.Property(e => e.Year).HasColumnName("year");
        });

        modelBuilder.Entity<Visu2Icecore>(entity =>
        {
            entity.ToTable("visu2_icecore");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Co2Ppm).HasColumnName("co2_ppm");
            entity.Property(e => e.IcecoreId).HasColumnName("icecore_id");
            entity.Property(e => e.Year).HasColumnName("year");
        });

        modelBuilder.Entity<Visu2Monthly>(entity =>
        {
            entity.ToTable("visu2_monthly");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Average).HasColumnName("average");
            entity.Property(e => e.Time)
                .HasColumnType("date")
                .HasColumnName("time");
        });

        modelBuilder.Entity<Visu3Event>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("visu3_events");

            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.YearsAgo).HasColumnName("years_ago");
        });

        modelBuilder.Entity<Visu3Global>(entity =>
        {
            entity.HasKey(e => e.YearKbp);

            entity.ToTable("visu3_global");

            entity.Property(e => e.YearKbp)
                .ValueGeneratedNever()
                .HasColumnName("year_kbp");
            entity.Property(e => e.Co2Ppm).HasColumnName("co2_ppm");
            entity.Property(e => e.GlobalTempChange).HasColumnName("global_temp_change");
        });

        modelBuilder.Entity<Visu4Co2>(entity =>
        {
            entity.ToTable("visu4_co2");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AntiguaAndBarbuda).HasColumnName("Antigua_and_Barbuda");
            entity.Property(e => e.BonaireSaintEustatiusAndSaba).HasColumnName("Bonaire_Saint_Eustatius_and_Saba");
            entity.Property(e => e.BosniaAndHerzegovina).HasColumnName("Bosnia_and_Herzegovina");
            entity.Property(e => e.BritishVirginIslands).HasColumnName("British_Virgin_Islands");
            entity.Property(e => e.BruneiDarussalam).HasColumnName("Brunei_Darussalam");
            entity.Property(e => e.BurkinaFaso).HasColumnName("Burkina_Faso");
            entity.Property(e => e.CTeDIvoire).HasColumnName("C_te_d_Ivoire");
            entity.Property(e => e.CapeVerde).HasColumnName("Cape_Verde");
            entity.Property(e => e.CentralAfricanRepublic).HasColumnName("Central_African_Republic");
            entity.Property(e => e.CookIslands).HasColumnName("Cook_Islands");
            entity.Property(e => e.CostaRica).HasColumnName("Costa_Rica");
            entity.Property(e => e.CuraAo).HasColumnName("Cura_ao");
            entity.Property(e => e.CzechRepublic).HasColumnName("Czech_Republic");
            entity.Property(e => e.DemocraticRepublicOfTheCongo).HasColumnName("Democratic_Republic_of_the_Congo");
            entity.Property(e => e.DominicanRepublic).HasColumnName("Dominican_Republic");
            entity.Property(e => e.ElSalvador).HasColumnName("El_Salvador");
            entity.Property(e => e.EquatorialGuinea).HasColumnName("Equatorial_Guinea");
            entity.Property(e => e.FaeroeIslands).HasColumnName("Faeroe_Islands");
            entity.Property(e => e.FrenchGuiana).HasColumnName("French_Guiana");
            entity.Property(e => e.FrenchPolynesia).HasColumnName("French_Polynesia");
            entity.Property(e => e.GuineaBissau).HasColumnName("Guinea_Bissau");
            entity.Property(e => e.HongKong).HasColumnName("Hong_Kong");
            entity.Property(e => e.MarshallIslands).HasColumnName("Marshall_Islands");
            entity.Property(e => e.MicronesiaFederatedStatesOf).HasColumnName("Micronesia_Federated_States_of");
            entity.Property(e => e.MtCo2Yr).HasColumnName("MtCO2_yr");
            entity.Property(e => e.NewCaledonia).HasColumnName("New_Caledonia");
            entity.Property(e => e.NewZealand).HasColumnName("New_Zealand");
            entity.Property(e => e.NorthKorea).HasColumnName("North_Korea");
            entity.Property(e => e.NorthMacedonia).HasColumnName("North_Macedonia");
            entity.Property(e => e.OccupiedPalestinianTerritory).HasColumnName("Occupied_Palestinian_Territory");
            entity.Property(e => e.PapuaNewGuinea).HasColumnName("Papua_New_Guinea");
            entity.Property(e => e.RUnion).HasColumnName("R_union");
            entity.Property(e => e.RussianFederation).HasColumnName("Russian_Federation");
            entity.Property(e => e.SaintHelena).HasColumnName("Saint_Helena");
            entity.Property(e => e.SaintKittsAndNevis).HasColumnName("Saint_Kitts_and_Nevis");
            entity.Property(e => e.SaintLucia).HasColumnName("Saint_Lucia");
            entity.Property(e => e.SaintPierreAndMiquelon).HasColumnName("Saint_Pierre_and_Miquelon");
            entity.Property(e => e.SaintVincentAndTheGrenadines).HasColumnName("Saint_Vincent_and_the_Grenadines");
            entity.Property(e => e.SaoTomeAndPrincipe).HasColumnName("Sao_Tome_and_Principe");
            entity.Property(e => e.SaudiArabia).HasColumnName("Saudi_Arabia");
            entity.Property(e => e.SierraLeone).HasColumnName("Sierra_Leone");
            entity.Property(e => e.SintMaartenDutchPart).HasColumnName("Sint_Maarten_Dutch_part");
            entity.Property(e => e.SolomonIslands).HasColumnName("Solomon_Islands");
            entity.Property(e => e.SouthAfrica).HasColumnName("South_Africa");
            entity.Property(e => e.SouthKorea).HasColumnName("South_Korea");
            entity.Property(e => e.SouthSudan).HasColumnName("South_Sudan");
            entity.Property(e => e.SriLanka).HasColumnName("Sri_Lanka");
            entity.Property(e => e.TimorLeste).HasColumnName("Timor_Leste");
            entity.Property(e => e.TrinidadAndTobago).HasColumnName("Trinidad_and_Tobago");
            entity.Property(e => e.TurksAndCaicosIslands).HasColumnName("Turks_and_Caicos_Islands");
            entity.Property(e => e.UnitedArabEmirates).HasColumnName("United_Arab_Emirates");
            entity.Property(e => e.UnitedKingdom).HasColumnName("United_Kingdom");
            entity.Property(e => e.Usa).HasColumnName("USA");
            entity.Property(e => e.VietNam).HasColumnName("Viet_Nam");
            entity.Property(e => e.WallisAndFutunaIslands).HasColumnName("Wallis_and_Futuna_Islands");
        });

        modelBuilder.Entity<Visu5Co2sector>(entity =>
        {
            entity.ToTable("visu5_co2sector");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EmissionsSharePer).HasColumnName("emissions_share_per");
            entity.Property(e => e.Sector)
                .HasMaxLength(50)
                .HasColumnName("sector");
            entity.HasMany(e => e.Visu5Co2subs)
                  .WithOne(e => e.Sector);
        });

        modelBuilder.Entity<Visu5Co2sub>(entity =>
        {
            entity.ToTable("visu5_co2sub");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EmissionsSharePer).HasColumnName("emissions_share_per");
            entity.Property(e => e.SSectorName)
                .HasMaxLength(50)
                .HasColumnName("s_sector_name");
            entity.Property(e => e.SectorId).HasColumnName("sector_id");

            entity.HasOne(d => d.Sector).WithMany(p => p.Visu5Co2subs)
                .HasForeignKey(d => d.SectorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_sector_id_subsector_id");
        });

        modelBuilder.Entity<VisuInfo>(entity =>
        {
            entity.ToTable("visu_info");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DataLink)
                .HasMaxLength(255)
                .HasColumnName("data_link");
            entity.Property(e => e.DescriptionLink)
                .HasMaxLength(255)
                .HasColumnName("description_link");
            entity.Property(e => e.DescriptionText)
                .HasMaxLength(2000)
                .HasColumnName("description_text");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.VisuChartNumber).HasColumnName("visu_chart_number");
            entity.Property(e => e.VisuNumber).HasColumnName("visu_number");
        });

        modelBuilder.Entity<VisuUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_users");

            entity.ToTable("visu_user");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserNick)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("user_nick");
            entity.Property(e => e.UserPassHash)
                .HasMaxLength(128)
                .IsUnicode(false)
                .HasColumnName("user_pass_hash");
        });

        modelBuilder.Entity<VisuUserVisual>(entity =>
        {
            entity.ToTable("visu_user_visuals");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ColumnView).HasColumnName("column_view");
            entity.Property(e => e.UrlHeader)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("url_header");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.VisuUserVisuals)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_visu_user_visuals_visu_user");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
