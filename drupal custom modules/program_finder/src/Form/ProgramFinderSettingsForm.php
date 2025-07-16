<?php

namespace Drupal\program_finder\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Settings form for Program Finder.
 */
class ProgramFinderSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'program_finder_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['program_finder.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('program_finder.settings');

    $form['disable_page'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable/Disable Program Finder page'),
      '#default_value' => $config->get('disable_page'),
      '#description' => $this->t('Check this to enable the public Program Finder page.'),
    ];

    $form['finder_path'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Program Finder Page Path'),
      '#default_value' => $config->get('finder_path') ?? '/finder',
      '#description' => $this->t('Enter the path where the program finder page should be available, e.g., /programs'),
      '#required' => TRUE,
      '#states' => [
        'disabled' => [
          ':input[name="disable_page"]' => ['checked' => FALSE],
        ],
      ],
    ];

    return parent::buildForm($form, $form_state) + $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('program_finder.settings');
    $config->set('finder_path', $form_state->getValue('finder_path'));
    $config->set('disable_page', $form_state->getValue('disable_page'));
    $config->save();

    \Drupal::service('router.builder')->rebuild();

    parent::submitForm($form, $form_state);
  }
}