<?php

namespace Drupal\custom_entities\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;

/**
 * Provides settings for Meeting entity type.
 */
class MeetingSettingsForm extends FormBase {

  public function getFormId() {
    return 'meeting_settings';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['description'] = [
      '#markup' => '<p>' . $this->t('Manage field and display settings for Meeting entities.') . '</p>',
    ];

    $form['actions'] = ['#type' => 'actions'];
    
    $form['actions']['manage_fields'] = [
      '#type' => 'link',
      '#title' => $this->t('Manage fields'),
      '#url' => Url::fromRoute('entity.meeting.field_ui_fields'),
      '#attributes' => ['class' => ['button']],
    ];

    $form['actions']['manage_form_display'] = [
      '#type' => 'link',
      '#title' => $this->t('Manage form display'),
      '#url' => Url::fromRoute('entity.entity_form_display.meeting.default'),
      '#attributes' => ['class' => ['button']],
    ];

    $form['actions']['manage_display'] = [
      '#type' => 'link',
      '#title' => $this->t('Manage display'),
      '#url' => Url::fromRoute('entity.entity_view_display.meeting.default'),
      '#attributes' => ['class' => ['button']],
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {}
}