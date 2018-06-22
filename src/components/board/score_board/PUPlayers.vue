<template>
  <div class="program-players">
		<md-tabs class="tabs-lblue">
			<md-tab id="tab-player" md-label="Players">
				<div class="cards-layout">
					<md-card md-with-hover class="card-player-eligibility">
						<div class="top-box">
							<md-avatar class="md-size-c">
								<img src="@/assets/avatar.jpg" alt="avatar">
							</md-avatar>
							<div class="name">Mylo Fernandez</div>
							<div class="eligibility cred">Inelegible</div>
							<div class="total-label">Total</div>
							<div class="total-amount">$3,500</div>
						</div>
						<div class="bars-with-hover">
							<div class="green">
								<div class="hover">
									<div class="hover-title">Paid</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
							<div class="gray">
								<div class="hover">
									<div class="hover-title">Lack</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
							<div class="red">
								<div class="hover">
									<div class="hover-title">Overdue</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
							<div class="blue">
								<div class="hover">
									<div class="hover-title">Some</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
						</div>
					</md-card>

					<md-card md-with-hover class="card-player-eligibility">
						<div class="top-box">
							<md-icon class="md-size-2x">
								account_circle
							</md-icon>
							<div class="name">Lolo Fernandez</div>
							<div class="eligibility">&nbsp;</div>
							<div class="total-label">Total</div>
							<div class="total-amount">$2,500</div>
						</div>
						<div class="bars-with-hover">
							<div class="green">
								<div class="hover">
									<div class="hover-title">Paid</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
							<div class="gray">
								<div class="hover">
									<div class="hover-title">Lack</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
							<div class="red">
								<div class="hover">
									<div class="hover-title">Overdue</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
							<div class="blue">
								<div class="hover">
									<div class="hover-title">Some</div>
									<div class="hover-number">$38,000</div>
								</div>
							</div>
						</div>
					</md-card>

				</div>
			</md-tab>
			<md-tab id="tab-plans" md-label="Program Payment Plans">
				<div class="cards-layout">
					<md-card md-with-hover class="card-payment-plan">
						<div class="title">
							Dues - Installments
						</div>
						<div class="body">
							<div class="number-big cgreen">$3.250.00</div>
							<div class="title-info">2 Installments</div>
							<div class="title-info">Nov 15, 2018 - Mar 1, 2019</div>
						</div>
						<div class="actions">
							<md-button class="md-icon-button">
								<md-icon>visibility</md-icon>
							</md-button>
							<md-menu md-size="small" md-direction="top-start">
								<md-button class="md-icon-button md-accent lblue" md-menu-trigger>
									<md-icon>more_vert</md-icon>
								</md-button>
								<md-menu-content>
									<md-menu-item @click="cannotDeleteAlert = true">
										DELETE
									</md-menu-item>
									<md-menu-item @click="confirmDeleteAlert = true">
										DUPLICATE
									</md-menu-item>
									<md-menu-item @click="btnData = 'click 1'">
										EDIT
									</md-menu-item>
								</md-menu-content>
							</md-menu>
						</div>
					</md-card>
					<md-card md-with-hover class="card-payment-plan">
						<div class="title">
							Dues - Installments (Salt Lake travel)
						</div>
						<div class="body">
							<div class="number-big cgreen">$3.250.00</div>
							<div class="title-info">2 Installments</div>
							<div class="title-info">Nov 15, 2018 - Mar 1, 2019</div>
						</div>
						<div class="actions">
							<md-button class="md-icon-button">
								<md-icon>visibility_off</md-icon>
							</md-button>
							<md-menu md-size="small" md-direction="top-start">
								<md-button class="md-icon-button md-accent lblue" md-menu-trigger>
									<md-icon>more_vert</md-icon>
								</md-button>
								<md-menu-content>
									<md-menu-item @click="cannotDeleteAlert = true">
										DELETE
									</md-menu-item>
									<md-menu-item @click="confirmDeleteAlert = true">
										DUPLICATE
									</md-menu-item>
									<md-menu-item @click="btnData = 'click 1'">
										EDIT
									</md-menu-item>
								</md-menu-content>
							</md-menu>

						</div>
					</md-card>
				</div>
			</md-tab>
		</md-tabs>

	</div>
</template>
